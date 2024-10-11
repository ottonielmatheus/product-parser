import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigInDto } from './dto/sigin.dto';
import { Public } from '@core/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() signInDto: SigInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
