import "dotenv/config";

const PORT = process.env.PORT || "3000";
const NODE_ENV = process.env.NODE_ENV || 'development'

const SECRETKEY = process.env.SECRETKEY || "abdefg123456";
const TOKEN = process.env.TOKEN = "x-token";

export {
    PORT,
    SECRETKEY,
    TOKEN,
    NODE_ENV
};