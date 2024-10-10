import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Import, ImportSchema } from './import.schema';
import { ImportsService } from './import.service';

const ImportModel = MongooseModule.forFeature([
  {
    name: Import.name,
    schema: ImportSchema,
  },
]);

@Module({
  imports: [ImportModel],
  controllers: [],
  providers: [ImportsService],
  exports: [ImportModel],
})
export class ImportsModule {}
