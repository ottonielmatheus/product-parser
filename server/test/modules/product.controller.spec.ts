import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '@modules/products/products.controller';
import { ProductsModule } from '@modules/products/products.module';

describe('ProductsController', () => {
  let productsController: ProductsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile();

    productsController = app.get<ProductsController>(ProductsController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('listProducts', () => {
    it('giving take 10 and skip 0 products should return 10 products items paginated', async () => {
      expect(await productsController.listProducts(10, 0)).toEqual({});
    });
  });
});
