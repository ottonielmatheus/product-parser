import { Injectable } from '@nestjs/common';
import { Credential } from './credential.model';
import { CredentialsRepository } from './credentials.repository';

@Injectable()
export class CredentialsService {
  constructor(private readonly credentialsRepository: CredentialsRepository) {}

  async findByEmail(email: string): Promise<Credential | null> {
    return this.credentialsRepository.findOne({ email });
  }
}
