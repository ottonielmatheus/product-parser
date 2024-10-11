import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ProductStatus } from '@interfaces';
import { Product } from '../product.schema';

export class UpdateProductDto extends PartialType(Product) {
  @ApiProperty({ enum: ProductStatus })
  readonly status: ProductStatus;

  @ApiProperty()
  readonly brands: string;

  @ApiProperty()
  readonly categories: string;

  @ApiProperty()
  readonly cities: string;

  @ApiProperty()
  readonly code: number;

  @ApiProperty()
  readonly creator: string;

  @ApiProperty()
  readonly image_url: string;

  @ApiProperty()
  readonly ingredients_text: string;

  @ApiProperty()
  readonly labels: string;

  @ApiProperty()
  readonly main_category: string;

  @ApiProperty()
  readonly nutriscore_grade: string;

  @ApiProperty()
  readonly nutriscore_score: number;

  @ApiProperty()
  readonly product_name: string;

  @ApiProperty()
  readonly purchase_places: string;

  @ApiProperty()
  readonly quantity: string;

  @ApiProperty()
  readonly serving_quantity: number;

  @ApiProperty()
  readonly serving_size: string;

  @ApiProperty()
  readonly stores: string;

  @ApiProperty()
  readonly traces: string;

  @ApiProperty()
  readonly url: string;
}
