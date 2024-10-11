import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Import, ImportSchema } from './import.schema';
import { ImportsService } from './imports.service';

const ImportModel = MongooseModule.forFeature([
  {
    name: Import.name,
    schema: ImportSchema,
  },
]);

@Module({
  imports: [ImportModel],
  exports: [ImportModel],
  controllers: [],
  providers: [ImportsService],
})
export class ImportsModule {}
