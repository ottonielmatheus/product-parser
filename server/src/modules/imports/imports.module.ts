import { Module } from '@nestjs/common';
import { ImportModel } from './import.model';
import { ImportsService } from './imports.service';
import { ImportsRepository } from './imports.repository';

@Module({
  imports: [ImportModel],
  exports: [ImportModel, ImportsRepository],
  controllers: [],
  providers: [ImportsRepository, ImportsService],
})
export class ImportsModule {}
