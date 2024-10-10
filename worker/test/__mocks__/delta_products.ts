import { join } from 'path';
import * as fs from 'fs';
import { Readable } from 'stream';

const buffer = fs.createReadStream(join(__dirname, './products.json.gz'));
export const readable = Readable.from(buffer);
