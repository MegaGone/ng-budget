import { connect } from "mongoose";
import { MONGO_DB_HOSTNAME } from "src/config";

/**
 * CONNECT TO MONGO DB CONNECTION
 */
export const dbConnection = async() => {
    try {
        await connect(MONGO_DB_HOSTNAME)
        console.log(`DATABASE CONNECTED`);
    } catch (error: any) {
        throw new Error("[ERROR][DATABASE][INIT], ", error);
    }
};