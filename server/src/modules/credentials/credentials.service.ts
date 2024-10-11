import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Credential } from './credential.schema';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectModel(Credential.name)
    private readonly credentialModel: Model<Credential>,
  ) {}

  async findByEmail(email: string): Promise<Credential | null> {
    return this.credentialModel.findOne({ email }).exec();
  }
}
