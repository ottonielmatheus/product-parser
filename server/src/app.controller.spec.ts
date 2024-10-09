import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return app name, database read and write health, last CRON executed, time alive and memory usage', async () => {
      expect(await appController.getHealth()).toStrictEqual({
        status: expect.stringMatching(/(ok|warn|degraded)/),
        name: 'product-parser-api',
        database: {
          read: 'ok',
          status: 'ok',
          write: 'ok',
        },
        memory: {
          status: expect.stringMatching(/(ok|warn|degraded)/),
          total: expect.stringMatching(/\d+MB/),
          used: expect.stringMatching(/\d+MB/),
          used_percent: expect.stringMatching(/\d{2,3}.\d{2}/),
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
