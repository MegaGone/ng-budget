import { connect } from "mongoose";

/**
 * CONNECT TO MONGO DB CONNECTION
 */
const dbConnection = async() => {
    try {
        await connect(process.env.DB_CNN!)
        console.log(`DATABASE CONNECTED`);
    } catch (error) {
        throw new Error("ERROR CONNECTING TO DB");
    }
};

export default dbConnection;