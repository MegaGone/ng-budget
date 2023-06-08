import { Connection, connect } from "mongoose";
import { DB_HOSTNAME } from "src/config";

export class Datasource {
    private connection!: Connection;

    public async connect() {
        try {
            const { connection } = await connect(DB_HOSTNAME);
            this.connection = connection;
        } catch (error: any) {
            throw new Error(error);
        }
    };

    public status() {
        return this.connection.readyState;
    };
};