import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CRONLog } from './cron-log.schema';
import { Model } from 'mongoose';

@Injectable()
export class CRONLogsService {
  constructor(
    @InjectModel(CRONLog.name) private readonly cronLogModel: Model<CRONLog>,
  ) {}

  async getLast(): Promise<CRONLog | null> {
    return this.cronLogModel.findOne().sort({ runned_t: 'desc' }).exec();
  }
}
