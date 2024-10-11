import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IImport, ImportStatus } from '@interfaces';

export type ImportDocument = HydratedDocument<Import>;

@Schema()
export class Import implements IImport {
  @Prop({ enum: ImportStatus })
  status: ImportStatus;

  @Prop()
  runned_t: Date;

  @Prop()
  finished_t: Date;

  @Prop()
  total_data_imported: number;

  @Prop()
  message: string;
}

export const ImportSchema = SchemaFactory.createForClass(Import);
