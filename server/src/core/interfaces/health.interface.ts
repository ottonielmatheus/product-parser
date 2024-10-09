import { ICRONLog } from './cron-log.interface';

export enum HealthStatus {
  OK = 'ok',
  WARN = 'warn',
  DEGRADED = 'degraded',
}

export interface IMemoryHealth {
  status: HealthStatus;
  total: string;
  used: string;
  used_percent: string;
}

export interface IDatabaseHealth {
  status: HealthStatus;
  read: HealthStatus;
  write: HealthStatus;
}

export interface IAppHealth {
  name: string;
  status: HealthStatus;
  uptime: {
    seconds: number;
    human_readable: string;
  };
  memory: IMemoryHealth;
  database: IDatabaseHealth;
  last_runned_cron: ICRONLog | null;
}
