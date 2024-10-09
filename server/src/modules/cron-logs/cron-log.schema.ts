import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CRONLogStatus, ICRONLog } from '@interfaces';

export type CRONLOGDocument = HydratedDocument<CRONLog>;

@Schema()
export class CRONLog implements ICRONLog {
  @Prop({ enum: CRONLogStatus })
  status: CRONLogStatus;

  @Prop()
  runned_t: Date;

  @Prop()
  total_data_synced: number;
}

export const CRONLogSchema = SchemaFactory.createForClass(CRONLog);
