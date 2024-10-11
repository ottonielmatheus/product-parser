import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IAppHealth } from '@interfaces';
import { Public } from './core/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  async getHealth(): Promise<IAppHealth> {
    return this.appService.getHealth();
  }
}
