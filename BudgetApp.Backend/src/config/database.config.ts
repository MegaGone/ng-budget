import "dotenv/config";

const DB_HOSTNAME = process.env.MONGO_DB_HOSTNAME  || "mongodb+srv://admin:*****.*****.mongodb.net/Admin";
const DB_NAME = process.env.MONGO_DB_NAME || "Sandbox";
const DB_TLS = process.env.MONGO_DB_TLS || true;
const DB_SSL = process.env.MONGO_DB_SSL || true;

export {
    DB_HOSTNAME,
    DB_NAME,
    DB_SSL,
    DB_TLS
};