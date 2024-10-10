import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseService } from './core/services/mongoose.service';
import { ImportsModule } from './modules/imports/import.module';
import { ImportsService } from './modules/imports/import.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useClass: MongooseService,
    }),
    ProductsModule,
    ImportsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ImportsService],
})
export class AppModule {}
