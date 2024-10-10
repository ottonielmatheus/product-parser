export enum ImportStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  PENDING = 'pending',
}

export interface IImport {
  status: ImportStatus;
  runned_t: Date;
  finished_t: Date;
  total_data_imported: number;
  message?: string;
}
