import { ImportHandler, run } from './../../src/handler';
import { readable } from './../__mocks__/delta_products';
import { Database } from '@core/services/database';
import { ImportModel } from '@core/models/import.model';
import { ProductModel } from '@core/models/product.model';
import { SNS } from '@core/services/SNS';
import { PublishCommandOutput } from '@aws-sdk/client-sns';

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

  it('when a download error occurs import status should be "failed"', async () => {
    jest
      .spyOn(ImportHandler, 'getLastAvailableDelta')
      .mockResolvedValue('last_delta.json.gz');

    jest
      .spyOn(ImportHandler, 'downloadDelta')
      .mockRejectedValue(new Error('Failed to download delta'));

    const snsNotify = jest
      .spyOn(SNS, 'notify')
      .mockResolvedValue({ MessageId: 'message-id' } as PublishCommandOutput);

    const importData = await run();

    expect(snsNotify).toHaveBeenCalledWith(
      'products-pooling-error-alert',
      'Failed to download delta',
    );
    expect(importData.status).toBe('failed');
    expect(importData.message).toBe('Failed to download delta');
  });
});
