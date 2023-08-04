import "dotenv/config";

const DB_HOSTNAME = process.env.DB_HOSTNAME  || "mongodb+srv://admin:*****.*****.mongodb.net/ngBudget";

export {
    DB_HOSTNAME
};