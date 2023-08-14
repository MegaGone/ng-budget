import "dotenv/config";

const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "";
const SMTP_PORT = process.env.SMTP_PORT || "";
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_SSL = process.env.SMTP_SSL || true;

const FORGOT_PASSWORD_TEMPLATE_ID = process.env.FORGOT_PASSWORD_TEMPLATE_ID || "";
const ACTIVATE_USER_TEMPLATE_ID = process.env.ACTIVATE_USER_TEMPLATE_ID || "";
const OTP_SESSION_EXPIRATION = process.env.OTP_SESSION_EXPIRATION || "24 horas";

const BASE_URL = process.env.BASE_URL || "http://localhost:4200/";

export { 
    SMTP_HOST, 
    SMTP_PORT, 
    SMTP_USER, 
    SMTP_PASSWORD,
    SMTP_SSL,
    FORGOT_PASSWORD_TEMPLATE_ID,
    ACTIVATE_USER_TEMPLATE_ID,
    BASE_URL,
    OTP_SESSION_EXPIRATION
};