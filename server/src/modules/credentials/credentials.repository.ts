import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Credential } from './credential.model';
import { BaseRepository } from '@shared/base-repository';

@Injectable()
export class CredentialsRepository extends BaseRepository<Credential> {
  constructor(
    @InjectModel(Credential.name)
    private readonly credentialModel: Model<Credential>,
  ) {
    super(credentialModel);
  }
}
