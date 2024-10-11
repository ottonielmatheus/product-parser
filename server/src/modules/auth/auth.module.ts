import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '@consts';
import { CredentialsModule } from '../credentials/credentials.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    CredentialsModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
