import * as os from 'os';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppModule } from '../src/app.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('root', () => {
    it('should return app name, database read and write health, last CRON executed, time alive and memory usage', async () => {
      jest.spyOn(os, 'totalmem').mockReturnValue(8 * 1024 * 1024 * 1024);
      jest.spyOn(os, 'freemem').mockReturnValue(4 * 1024 * 1024 * 1024);

      expect(await appController.getHealth()).toEqual({
        status: expect.stringMatching(/(ok|warn|degraded)/),
        name: 'product-parser-api',
        database: {
          read: 'ok',
          status: 'ok',
          write: 'ok',
        },
        memory: {
          status: 'ok',
          total: '8192MB',
          used: '4096MB',
          used_percent: '50.00',
        },
        uptime: {
          human_readable: expect.any(String),
          seconds: expect.any(Number),
        },
        last_runned_cron: null,
      });
    });
  });
});
