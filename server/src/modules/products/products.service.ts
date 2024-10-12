import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
import { ProductStatus } from '@interfaces';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(take: number, skip: number) {
    return this.productsRepository.find({}, { take, skip });
  }

  findByCode(code: number) {
    return this.productsRepository.findOne({ code });
  }

  deleteByCode(code: number) {
    return this.productsRepository.update(
      { code },
      { status: ProductStatus.TRASH },
    );
  }

  updateByCode(code: number, updatedProduct: Partial<Product>) {
    updatedProduct.last_modified_t = new Date();
    return this.productsRepository.update({ code }, updatedProduct);
  }
}
