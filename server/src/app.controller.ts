import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IAppHealth } from '@interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHealth(): Promise<IAppHealth> {
    return this.appService.getHealth();
  }
}
