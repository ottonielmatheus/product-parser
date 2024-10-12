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

      const res = await appController.getHealth();

      expect(res.status).toMatch(/(ok|warn|degraded)/);
      expect(res.name).toBe('Product Parser API');
      expect(res.memory.total).toBe('8192MB');
      expect(res.memory.used).toBe('4096MB');
      expect(res.memory.used_percent).toBe('50.00');

      expect(res.database).toStrictEqual({
        read: 'ok',
        status: 'ok',
        write: 'ok',
      });

      expect(res.uptime).toStrictEqual({
        human_readable: expect.any(String),
        seconds: expect.any(Number),
      });

      expect(res.memory).toStrictEqual({
        status: 'ok',
        total: '8192MB',
        used: '4096MB',
        used_percent: '50.00',
      });
    });
  });
});
