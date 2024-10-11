import { Readable } from 'stream';
import { createUnzip } from 'zlib';
import { createInterface } from 'readline';
import { ClientSession } from 'mongoose';
import env from './core/env';
import { ImportStatus } from './core/interfaces/import.interface';
import { Database } from './core/services/database';
import { ImportDocument, ImportModel } from './core/models/import.model';
import { ProductModel } from './core/models/product.model';
import { IProduct, ProductStatus } from './core/interfaces/product.interface';

const MAX_ROWS = 100;

export class ImportHandler {
  static import: ImportDocument;
  static session: ClientSession;

  static async run(session: ClientSession): Promise<ImportDocument> {
    this.session = session;
    this.import = new ImportModel({
      status: ImportStatus.PENDING,
      runned_t: new Date(),
    });
    await this.import.save({ session });

    try {
      const lastDelta = await this.getLastAvailableDelta();
      const delta = await this.downloadDelta(lastDelta);

      const rows = await this.readLines(delta, MAX_ROWS);
      await ProductModel.insertMany(rows, { session });

      this.import.total_data_imported = rows.length;
      this.import.status = ImportStatus.SUCCESS;
    } catch (err) {
      this.import.message = err.message;
      this.import.status = ImportStatus.FAILED;

      // because we want to CloudWatch catch it
      throw err;
    }

    this.import.finished_t = new Date();
    await this.import.save({ session: this.session });

    return this.import;
  }

  static async getLastAvailableDelta(): Promise<string> {
    try {
      const deltaList = await fetch(env.OPEN_FOOD_DELTA_URL + '/index.txt');
      const deltas = await deltaList.text();
      const endline = deltas.indexOf('\n');
      return deltas.substring(0, endline);
    } catch {
      throw new Error('Failed while getting last availableq delta');
    }
  }

  static async downloadDelta(delta: string): Promise<Readable> {
    try {
      const deltaFile = await fetch(env.OPEN_FOOD_DELTA_URL + `/${delta}`);
      const blob = await deltaFile.blob();
      return Readable.fromWeb(blob.stream() as any);
    } catch {
      throw new Error('Failed while downloading delta');
    }
  }

  static async readLines(
    readable: Readable,
    limit: number,
  ): Promise<IProduct[]> {
    const rows: IProduct[] = [];

    try {
      const reader = createInterface({
        input: readable.pipe(createUnzip()),
        crlfDelay: Infinity,
      });
      let i = 0;

      for await (const line of reader) {
        if (i >= limit) break;

        const mappedProduct = this.mapper(JSON.parse(line));
        rows.push(mappedProduct);
        i++;
      }

      reader.close();
    } catch {
      throw new Error('Failed while reading lines');
    }

    return rows;
  }

  static mapper(product: IProduct): IProduct {
    const fromUnixDate = (date: Date) => new Date(Number(date) * 1000);
    return {
      _id: product['_id'],
      status: ProductStatus.DRAFT,
      imported_t: new Date(),
      code: product['code'],
      url: product['url'],
      creator: product['creator'],
      product_name: product['product_name'],
      quantity: product['quantity'],
      brands: product['brands'],
      categories: product['categories'],
      labels: product['labels'],
      cities: product['cities'],
      purchase_places: product['purchase_places'],
      stores: product['stores'],
      ingredients_text: product['ingredients_text'],
      traces: product['traces'],
      serving_size: product['serving_size'],
      serving_quantity: product['serving_quantity'],
      nutriscore_score: product['nutriscore_score'],
      nutriscore_grade: product['nutriscore_grade'],
      main_category: product['main_category'],
      image_url: product['image_url'],
      created_t: fromUnixDate(product['created_t']),
      last_modified_t: fromUnixDate(product['last_modified_t']),
    };
  }
}

export async function run() {
  return await Database.connect<Promise<ImportDocument>>(
    async (session) => await ImportHandler.run(session),
  );
}
