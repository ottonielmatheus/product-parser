import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Import } from './import.schema';
import { Model } from 'mongoose';

@Injectable()
export class ImportsService {
  constructor(
    @InjectModel(Import.name) private readonly importsModel: Model<Import>,
  ) {}

  async getLast(): Promise<Import | null> {
    return this.importsModel.findOne().sort({ runned_t: 'desc' }).exec();
  }
}
