import { ImportHandler, run } from './../../src/handler';
import { readable } from './../__mocks__/delta_products';
import { Database } from '@core/services/database';
import { ImportModel } from '@core/models/import.model';
import { ProductModel } from '@core/models/product.model';

describe('Products pooling handler', () => {
  beforeEach(async () => {
    await Database.connect(async () => {
      await ImportModel.deleteMany({}).exec();
      await ProductModel.deleteMany({}).exec();
    });
  });

  it('should import product successfully', async () => {
    jest
      .spyOn(ImportHandler, 'getLastAvailableDelta')
      .mockResolvedValue('last_delta.json.gz');

    jest.spyOn(ImportHandler, 'downloadDelta').mockResolvedValue(readable);

    const importData = await run();
    expect(importData.status).toBe('success');

    await Database.connect(async () => {
      const insertedProduct = await ProductModel.findById(40680024750).exec();
      expect(insertedProduct).toBeDefined();
    });
  });
});
