import { IPaginated } from '@interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update.dto';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Requires access token' })
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  async listProducts(
    @Query('take') take: number,
    @Query('skip') skip: number,
  ): Promise<IPaginated<Product>> {
    return this.productsService.findAll(take, skip);
  }

  @ApiNotFoundResponse({ description: 'Product not found' })
  @Put(':code')
  async updateProduct(
    @Param('code') code: number,
    @Body() payload: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productsService.updateByCode(
      code,
      payload,
    );
    if (!updatedProduct) {
      throw new NotFoundException(`Product with code ${code} not found`);
    }
    return updatedProduct;
  }

  @ApiNotFoundResponse({ description: 'Product not found' })
  @Delete(':code')
  async deleteProduct(@Param('code') code: number): Promise<Product> {
    const deletedProduct = await this.productsService.deleteByCode(code);
    if (!deletedProduct) {
      throw new NotFoundException(`Product with code ${code} not found`);
    }
    return deletedProduct;
  }

  @ApiNotFoundResponse({ description: 'Product not found' })
  @Get(':code')
  async getProduct(@Param('code') code: number): Promise<Product> {
    const product = await this.productsService.findByCode(code);
    if (!product) {
      throw new NotFoundException(`Product with code ${code} not found`);
    }
    return product;
  }
}
