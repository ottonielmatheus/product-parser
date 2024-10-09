import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CRONLog, CRONLogSchema } from './cron-log.schema';
import { CRONLogsService } from './cron-logs.service';

const CRONLogModel = MongooseModule.forFeature([
  {
    name: CRONLog.name,
    schema: CRONLogSchema,
  },
]);

@Module({
  imports: [CRONLogModel],
  controllers: [],
  providers: [CRONLogsService],
  exports: [CRONLogModel],
})
export class CRONLogsModule {}
