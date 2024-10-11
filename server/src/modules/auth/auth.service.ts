import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialsService } from '../credentials/credentials.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly credentialsService: CredentialsService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const credential = await this.credentialsService.findByEmail(email);
    if (credential?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: credential._id, email: credential.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
