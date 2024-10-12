import { Module } from '@nestjs/common';
import { ProductModel } from './product.model';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [ProductModel],
  exports: [ProductModel, ProductsRepository],
  controllers: [ProductsController],
  providers: [ProductsRepository, ProductsService],
})
export class ProductsModule {}
