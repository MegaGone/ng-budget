import { connect } from "mongoose";
import { DB_HOSTNAME } from "src/config";

/**
 * CONNECT TO MONGO DB CONNECTION
 */
export const dbConnection = async() => {
    try {
        await connect(DB_HOSTNAME)
        // console.log(`DATABASE CONNECTED`);
    } catch (error) {
        throw new Error("ERROR CONNECTING TO DB");
    }
};