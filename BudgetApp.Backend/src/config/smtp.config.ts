import "dotenv/config";

const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "";
const SMTP_PORT = process.env.SMTP_PORT || "";
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_SSL = process.env.SMTP_SSL || true;

export { 
    SMTP_HOST, 
    SMTP_PORT, 
    SMTP_USER, 
    SMTP_PASSWORD,
    SMTP_SSL
};