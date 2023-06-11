import "dotenv/config";

const PORT = process.env.PORT || "3000";
const NODE_ENV = process.env.NODE_ENV || "development";

const SECRETKEY = process.env.SECRETKEY || "3qp5MR&fKKJR@T$feokxTS?ogxeGe5d4&4qc@G5d";
const TOKEN = process.env.TOKEN = "x-token";
const SESSION_LIFETIME = process.env.SESSION_LIFETIME || "1h";

export {
    PORT,
    SECRETKEY,
    TOKEN,
    NODE_ENV,
    SESSION_LIFETIME
};