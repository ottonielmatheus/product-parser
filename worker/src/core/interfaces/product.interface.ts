export enum ProductStatus {
  PUBLISHED = 'published',
  DRAFT = 'draft',
  TRASH = 'trash',
}

export interface IProduct {
  _id: number;
  status: string;
  imported_t: Date;
  code: number;
  url: string;
  creator: string;
  created_t: Date;
  last_modified_t: Date;
  product_name: string;
  quantity: string;
  brands: string;
  categories: string;
  labels: string;
  cities: string;
  purchase_places: string;
  stores: string;
  ingredients_text: string;
  traces: string;
  serving_size: string;
  serving_quantity: number;
  nutriscore_score: number;
  nutriscore_grade: string;
  main_category: string;
  image_url: string;
}
