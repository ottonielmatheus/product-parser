import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Import } from './import.model';
import { Model } from 'mongoose';
import { BaseRepository } from '@shared/base-repository';

@Injectable()
export class ImportsRepository extends BaseRepository<Import> {
  constructor(
    @InjectModel(Import.name) private readonly importsModel: Model<Import>,
  ) {
    super(importsModel);
  }
}
