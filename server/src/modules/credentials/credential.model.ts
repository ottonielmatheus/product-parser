import { HydratedDocument } from 'mongoose';
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

export const CredentialModel = MongooseModule.forFeature([
  {
    name: Credential.name,
    schema: SchemaFactory.createForClass(Credential),
  },
]);
