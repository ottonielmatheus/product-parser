export enum CRONLogStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
}

export interface ICRONLog {
  status: CRONLogStatus;
  runned_t: Date;
  total_data_synced: number;
}
