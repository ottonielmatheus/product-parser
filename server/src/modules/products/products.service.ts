import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { IPaginated, ProductStatus } from '@interfaces';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productsModel: Model<Product>,
  ) {}

  async findAll(take: number, skip: number): Promise<IPaginated<Product>> {
    const session = await this.productsModel.startSession();
    const products = await this.productsModel
      .find({}, {}, { session })
      .limit(take)
      .skip(skip)
      .exec();
    const count = await this.productsModel.countDocuments().exec();
    await session.endSession();
    return {
      items: products,
      total: count,
    };
  }

  findByCode(code: number): Promise<Product | null> {
    return this.productsModel.findOne({ code }).exec();
  }

  deleteByCode(code: number): Promise<Product | null> {
    return this.productsModel
      .findOneAndUpdate(
        { code },
        { status: ProductStatus.TRASH },
        { new: true },
      )
      .exec();
  }

  updateByCode(
    code: number,
    updatedProduct: Partial<Product>,
  ): Promise<Product | null> {
    updatedProduct.last_modified_t = new Date();
    return this.productsModel
      .findOneAndUpdate({ code }, updatedProduct, { new: true })
      .exec();
  }
}
