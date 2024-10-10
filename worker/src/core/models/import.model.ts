import { IImport } from 'core/interfaces/import.interface';
import { Document, HydratedDocument, Schema, model } from 'mongoose';

export type ImportDocument = Document<IImport>;

const importSchema = new Schema<IImport>({
  status: String,
  message: String,
  runned_t: Date,
  finished_t: Date,
  total_data_imported: { type: Number, default: 0 },
});

export type ImportModel = HydratedDocument<IImport>;
export const ImportModel = model<IImport>('Import', importSchema);
