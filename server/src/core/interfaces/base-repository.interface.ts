import { Model } from 'mongoose';

export interface IBaseRepository<T> {
  model: Model<T>;

  find(): Promise<T[]>;
  findOne(id: number): Promise<T>;
  delete(id: number): Promise<T>;
  update(id: number, updatedEntity: Partial<T>): Promise<T>;
}
