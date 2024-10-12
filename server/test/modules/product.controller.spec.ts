import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductStatus } from '@interfaces';
import { Product } from '@modules/products/product.model';
import { UpdateProductDto } from '@modules/products/dto/update.dto';
import { ProductsController } from '@modules/products/products.controller';
import { AppModule } from './../../src/app.module';
import {
  generateProducts,
  generateProductWith,
  clearProducts,
} from './../__mocks__/product';

describe('ProductsController', () => {
  let productController: ProductsController;

  beforeEach(async () => {
    await generateProducts(19);
    await generateProductWith({ code: 101010 });
  });

  beforeEach(async () => {
    const mod: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [],
      imports: [AppModule],
    }).compile();

    productController = mod.get<ProductsController>(ProductsController);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await clearProducts();
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('listProducts', () => {
    it('giving take 10 and skip 0 products should return 10 products items paginated', async () => {
      const paginated = await productController.listProducts(10, 0);
      expect(paginated.items).toHaveLength(10);
      expect(paginated.total).toBe(20);
    });
  });

  describe('getProduct', () => {
    it('given a product code, should return the respective product', async () => {
      const code = 101010;
      const product = await productController.getProduct(code);

      expect(product).toBeDefined();
      expect(product!.code).toBe(code);
    });

    it('given a product code that not exists, should throw a not found exception', async () => {
      const code = 0;
      await expect(productController.deleteProduct(code)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteProduct', () => {
    it('given a product code to delete, should delete the product and return it', async () => {
      const code = 101010;
      const deletedProduct = await productController.deleteProduct(code);
      expect(deletedProduct.status).toBe(ProductStatus.TRASH);
    });

    it('given a product code that not exists, should throw a not found exception', async () => {
      const code = 0;
      await expect(productController.deleteProduct(code)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateProduct', () => {
    it('given a new product and a code, should gived product', async () => {
      const code = 101010;
      const newProduct: Partial<Product> = {
        creator: 'John Doe',
      };

      const currentProduct = await productController.getProduct(code);
      expect(currentProduct.creator).not.toBe(newProduct.creator);

      const updatedProduct = await productController.updateProduct(
        code,
        newProduct as UpdateProductDto,
      );

      expect(updatedProduct.code).toBe(code);
      expect(updatedProduct.creator).toBe(newProduct.creator);
      expect(updatedProduct.last_modified_t).not.toBe(
        currentProduct.last_modified_t,
      );
    });

    it('given a product code that not exists, should throw a not found exception', async () => {
      const code = 0;
      await expect(productController.deleteProduct(code)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
