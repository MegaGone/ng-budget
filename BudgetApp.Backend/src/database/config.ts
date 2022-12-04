import { connect } from "mongoose";
import { DB_CNN } from "../config";

/**
 * CONNECT TO MONGO DB CONNECTION
 */
const dbConnection = async() => {
    try {
        console.log(DB_CNN);
        
        await connect(DB_CNN)
        console.log(`DATABASE CONNECTED`);
    } catch (error) {
        throw new Error("ERROR CONNECTING TO DB");
    }
};

export default dbConnection;