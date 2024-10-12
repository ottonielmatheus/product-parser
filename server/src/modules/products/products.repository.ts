import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { BaseRepository } from '@shared/base-repository';

@Injectable()
export class ProductsRepository extends BaseRepository<Product> {
  constructor(
    @InjectModel(Product.name) private readonly productsModel: Model<Product>,
  ) {
    super(productsModel);
  }
}
