import 'dotenv/config';

const PORT = process.env.PORT || "3000";
const DB_CNN = process.env.DB_CNN  || "mongodb+srv://admin:*****.*****.mongodb.net/Admin";
const SECRETKEY = process.env.SECRETKEY || "abdefg123456";

export { PORT, DB_CNN, SECRETKEY };