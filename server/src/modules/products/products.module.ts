import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './product.schema';

const ProductModel = MongooseModule.forFeature([
  {
    name: Product.name,
    schema: ProductSchema,
  },
]);

@Module({
  imports: [ProductModel],
  exports: [],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
