import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseService } from './core/services/mongoose.service';
import { CRONLogsModule } from './modules/cron-logs/cron-logs.module';
import { CRONLogsService } from './modules/cron-logs/cron-logs.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useClass: MongooseService,
    }),
    ProductsModule,
    CRONLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CRONLogsService],
})
export class AppModule {}
