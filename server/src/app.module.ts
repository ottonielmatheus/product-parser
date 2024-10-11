import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseService } from './core/services/mongoose.service';

import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';

import { ProductsModule } from './modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { ImportsModule } from './modules/imports/imports.module';
import { ImportsService } from './modules/imports/imports.service';
import { CredentialsModule } from './modules/credentials/credentials.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useClass: MongooseService,
    }),
    ImportsModule,
    ProductsModule,
    CredentialsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ImportsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
