import "dotenv/config";

const DB_HOSTNAME = process.env.DB_HOSTNAME  || "mongodb+srv://admin:*****.*****.mongodb.net/Admin";
const DB_NAME = process.env.DB_NAME || "Sandbox";
const DB_TLS = process.env.DB_TLS || true;
const DB_SSL = process.env.DB_SSL || true;

export {
    DB_HOSTNAME,
    DB_NAME,
    DB_SSL,
    DB_TLS
};