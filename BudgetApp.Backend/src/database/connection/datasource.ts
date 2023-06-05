import { connect, Mongoose, ConnectOptions } from "mongoose";
import { DB_HOSTNAME, DB_NAME, DB_SSL, DB_TLS } from "src/config";

export class GenericDataSource {
    private mongoose: Mongoose;

    constructor() {
        this.mongoose = new Mongoose();
    }

    async connect() {
        try {
            const options: ConnectOptions = {
                dbName: DB_NAME,
                ssl: (DB_SSL || DB_SSL.toLocaleLowerCase() === "true") ? true : false,
                tls: (DB_TLS || DB_TLS.toLocaleLowerCase() === "true") ? true : false
            };

            await this.mongoose.connect(DB_HOSTNAME, options);
        } catch (error) {
            console.log(error)
        };
    };

    async status(): Promise<number> {
        try {
            const { connection } = await this.mongoose;

            return connection.readyState;
        } catch (error: any) {
            throw new Error(error);
        };
    };
};