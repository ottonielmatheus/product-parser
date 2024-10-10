export enum ImportStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  PENINDG = 'pending',
}

export interface IImport {
  status: ImportStatus;
  runned_t: Date;
  total_data_imported: number;
}
