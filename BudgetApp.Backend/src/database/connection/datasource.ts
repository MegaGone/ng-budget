import { Mongoose, ConnectOptions } from "mongoose";
import { DB_HOSTNAME, DB_NAME, DB_SSL, DB_TLS } from "src/config";

export class GenericDataSource {
    private mongoose: Mongoose;

    constructor() {
        this.mongoose = new Mongoose();
    };

    /**
     * CONNECT TO DB
     */
    async connect(): Promise<void> {
        try {
            const options: ConnectOptions = {
                dbName: DB_NAME,
                ssl: (DB_SSL || DB_SSL.toLocaleLowerCase() === "true") ? true : false,
                tls: (DB_TLS || DB_TLS.toLocaleLowerCase() === "true") ? true : false
            };

            await this.mongoose.connect(DB_HOSTNAME, options);
        } catch (error: any) {
            throw new Error(error);
        };
    };

    /**
     * GET DB CONNECTION STATUS
     * @returns STATUS
     */
    async status(): Promise<number> {
        try {
            const { connection } = await this.mongoose;

            return connection.readyState;
        } catch (error: any) {
            throw new Error(error);
        };
    };

    /**
     * 
     * @returns MONGOOSE CLIENT
     */
    getClient(): Mongoose {
        return this.mongoose;
    };

    /**
     * DISCONNECT FROM THE DATABASE
     */
    async disconnect(): Promise<void> {
        try {
            await this.mongoose.disconnect();
        } catch (error: any) {
            throw new Error(error);  
        };
    };
};