import "dotenv/config";

const MONGO_DB_HOSTNAME = process.env.MONGO_DB_HOSTNAME  || "mongodb+srv://admin:*****.*****.mongodb.net/Admin";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "Sandbox";

export {
    MONGO_DB_HOSTNAME,
    MONGO_DB_NAME
};