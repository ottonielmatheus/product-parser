import { Injectable } from '@nestjs/common';
import { Import } from './import.model';
import { ImportsRepository } from './imports.repository';

@Injectable()
export class ImportsService {
  constructor(private readonly importsRepository: ImportsRepository) {}

  async getLast(): Promise<Import | null> {
    return this.importsRepository.findOne({}, { sort: { runned_t: 'desc' } });
  }
}
