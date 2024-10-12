import { IPaginated } from '@interfaces';
import { RootFilterQuery, Model, UpdateQuery, SortOrder } from 'mongoose';

type QueryParams = {
  take?: number;
  skip?: number;
  sort?: { [key: string]: SortOrder };
};

export class BaseRepository<T> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async find(
    query: RootFilterQuery<T>,
    params: QueryParams,
  ): Promise<IPaginated<T>> {
    const session = await this.model.startSession();
    const items = await this.model
      .find(query, {}, { session })
      .limit(params?.take || 15)
      .skip(params?.skip || 0)
      .exec();

    const count = await this.model.countDocuments().exec();
    await session.endSession();
    return {
      items,
      total: count,
    };
  }

  async findOne(
    query: RootFilterQuery<T>,
    params?: QueryParams,
  ): Promise<T | null> {
    const q = this.model.findOne(query);
    if (params?.sort) {
      q.sort(params.sort);
    }

    return await q.exec();
  }

  async update(
    query: RootFilterQuery<T>,
    updatedModel: UpdateQuery<T>,
  ): Promise<T | null> {
    return await this.model
      .findOneAndUpdate(query, updatedModel, { new: true })
      .exec();
  }
}
