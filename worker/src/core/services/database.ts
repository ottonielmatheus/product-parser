import mongoose, { ClientSession, Mongoose } from 'mongoose';
import env from './../env';

export class Database {
  static connection: Mongoose;
  static session: ClientSession;

  static async connect<T>(cb: (trx: ClientSession) => T): Promise<T> {
    try {
      this.connection = await mongoose.connect(env.MONGO_DB_URI);
      this.session = await this.connection.startSession();

      return await cb(this.session);
    } finally {
      await this.close();
    }
  }

  static async close() {
    if (this.connection) {
      await this.connection.disconnect();
    }
    if (this.session) {
      await this.session.endSession();
    }
  }
}
