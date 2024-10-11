import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICredential } from '@interfaces';

export type ImportDocument = HydratedDocument<Credential>;

@Schema()
export class Credential implements ICredential {
  @Prop()
  _id: string;

  @Prop()
  email: string;

  @Prop({ omit: true })
  password: string;
}

export const CredentialSchema = SchemaFactory.createForClass(Credential);
