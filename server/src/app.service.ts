import { freemem, totalmem } from 'os';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { addSeconds, formatDistance } from 'date-fns';
import {
  IAppHealth,
  IDatabaseHealth,
  IMemoryHealth,
  HealthStatus,
} from '@interfaces';
import { ImportsService } from './modules/imports/import.service';

const MAX_SAFE_MEMORY_USAGE_PERCENTAGE = 80;

@Injectable()
export class AppService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly importService: ImportsService,
  ) {}

  async getHealth(): Promise<IAppHealth> {
    const memoryHealth = this.calculateMemoryStatus();
    const databaseHealth = await this.calculateDatabaseStatus();
    const uptime = Math.floor(process.uptime());

    return {
      name: 'product-parser-api',
      status: this.calculateStatus(memoryHealth, databaseHealth),
      memory: memoryHealth,
      database: databaseHealth,
      uptime: {
        seconds: uptime,
        human_readable: formatDistance(
          addSeconds(new Date(), uptime),
          new Date(),
          { includeSeconds: true },
        ),
      },
      last_runned_cron: await this.importService.getLast(),
    };
  }

  private bytesToMegabytes(bytes: number): number {
    return Math.round(bytes / 1024 / 1024);
  }

  private calculateMemoryStatus(): IMemoryHealth {
    let status = HealthStatus.OK;

    const totalMemoryInMb = this.bytesToMegabytes(totalmem());
    const freeMemoryInMb = this.bytesToMegabytes(freemem());
    const usedMemoryInMb = totalMemoryInMb - freeMemoryInMb;
    const usedMemoryPercentage = (usedMemoryInMb / totalMemoryInMb) * 100;

    if (usedMemoryPercentage > MAX_SAFE_MEMORY_USAGE_PERCENTAGE) {
      status = HealthStatus.WARN;
    }

    return {
      status,
      total: `${totalMemoryInMb}MB`,
      used: `${usedMemoryInMb}MB`,
      used_percent: usedMemoryPercentage.toFixed(2),
    };
  }

  private async calculateDatabaseStatus(): Promise<IDatabaseHealth> {
    let status = HealthStatus.OK;
    const ping = await this.connection.db?.command({ ping: 1 });

    if (!ping?.ok) {
      status = HealthStatus.DEGRADED;
    }

    return {
      status,
      read: status,
      write: status,
    };
  }

  private calculateStatus(
    memory: IMemoryHealth,
    database: IDatabaseHealth,
  ): HealthStatus {
    if (
      memory.status !== HealthStatus.OK ||
      database.status !== HealthStatus.OK
    ) {
      return HealthStatus.DEGRADED;
    }

    return HealthStatus.OK;
  }
}
