import 'dotenv/config';

const PORT = process.env.PORT || "3000";
const DB_CNN = process.env.DB_CNN  || "mongodb+srv://admin:*****.*****.mongodb.net/Admin";
const SECRETKEY = process.env.SECRETKEY || "abdefg123456";
const TOKEN = process.env.TOKEN = "x-token";
const COUNTRIES_ENDPOINT = process.env.COUNTRIES_ENDPOINT  || "https://restcountries.com/v3.1/all";

export { PORT, DB_CNN, SECRETKEY, TOKEN, COUNTRIES_ENDPOINT };
