import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IProduct, ProductStatus } from '@interfaces';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product implements IProduct {
  @Prop()
  _id: number;

  @Prop({ enum: ProductStatus })
  status: ProductStatus;

  @Prop()
  brands: string;

  @Prop()
  categories: string;

  @Prop()
  cities: string;

  @Prop()
  code: number;

  @Prop()
  created_t: Date;

  @Prop()
  creator: string;

  @Prop()
  image_url: string;

  @Prop()
  imported_t: Date;

  @Prop()
  ingredients_text: string;

  @Prop()
  labels: string;

  @Prop()
  last_modified_t: Date;

  @Prop()
  main_category: string;

  @Prop()
  nutriscore_grade: string;

  @Prop()
  nutriscore_score: number;

  @Prop()
  product_name: string;

  @Prop()
  purchase_places: string;

  @Prop()
  quantity: string;

  @Prop()
  serving_quantity: number;

  @Prop()
  serving_size: string;

  @Prop()
  stores: string;

  @Prop()
  traces: string;

  @Prop()
  url: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
