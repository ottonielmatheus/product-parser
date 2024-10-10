import { HydratedDocument, Schema, model } from 'mongoose';
import { IProduct } from 'core/interfaces/product.interface';

const productSchema = new Schema<IProduct>({
  _id: Number,
  status: String,
  imported_t: Date,
  code: Number,
  url: String,
  creator: String,
  created_t: Date,
  last_modified_t: Date,
  product_name: String,
  quantity: String,
  brands: String,
  categories: String,
  labels: String,
  cities: String,
  purchase_places: String,
  stores: String,
  ingredients_text: String,
  traces: String,
  serving_size: String,
  serving_quantity: Number,
  nutriscore_score: Number,
  nutriscore_grade: String,
  main_category: String,
  image_url: String,
});

export type ProductModel = HydratedDocument<IProduct>;
export const ProductModel = model<IProduct>('Product', productSchema);
