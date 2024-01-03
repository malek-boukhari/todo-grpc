import mongoose, { Connection } from 'mongoose';

export class DbConnectionManager {
    public static async createConnection(): Promise<Connection> {
        const urlConnection = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;

        await mongoose.connect(urlConnection);
        return mongoose.connection;
    }
}
