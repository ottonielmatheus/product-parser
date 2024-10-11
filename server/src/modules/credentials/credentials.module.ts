import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Credential, CredentialSchema } from './credential.schema';
import { CredentialsService } from './credentials.service';

const CredentialModel = MongooseModule.forFeature([
  {
    name: Credential.name,
    schema: CredentialSchema,
  },
]);

@Module({
  imports: [CredentialModel],
  exports: [CredentialModel, CredentialsService],
  controllers: [],
  providers: [CredentialsService],
})
export class CredentialsModule {}
