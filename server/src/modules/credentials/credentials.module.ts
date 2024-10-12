import { Module } from '@nestjs/common';
import { CredentialModel } from './credential.model';
import { CredentialsService } from './credentials.service';
import { CredentialsRepository } from './credentials.repository';

@Module({
  imports: [CredentialModel],
  exports: [CredentialModel, CredentialsRepository, CredentialsService],
  controllers: [],
  providers: [CredentialsRepository, CredentialsService],
})
export class CredentialsModule {}
