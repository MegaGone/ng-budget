import "dotenv/config";

const PORT = process.env.PORT || "3000";
const NODE_ENV = process.env.NODE_ENV || "development";

const SECRETKEY = process.env.SECRETKEY || "";
const TOKEN = process.env.TOKEN = "x-token";
const SESSION_LIFETIME = process.env.SESSION_LIFETIME || "1h";
const COUNTRIES_ENDPOINT = process.env.COUNTRIES_ENDPOINT  || "https://restcountries.com/v3.1/all";

const OTP_MS_LIFETIME = parseInt(process.env.OTP_MS_LIFETIME!, 10) || 3600000;

export {
    PORT,
    SECRETKEY,
    TOKEN,
    NODE_ENV,
    SESSION_LIFETIME,
    OTP_MS_LIFETIME,
    COUNTRIES_ENDPOINT
};