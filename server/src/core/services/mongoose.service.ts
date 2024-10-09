import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongooseService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions(): Record<string, string> {
    const uri = this.configService.get<string>('MONGO_DB_URI');

    if (!uri) {
      throw new Error('Connection param is missing');
    }

    return {
      uri,
      user: this.configService.get<string>('MONGO_DB_USER') || '',
      pass: this.configService.get<string>('MONGO_DB_PASSWORD') || '',
    };
  }
}
