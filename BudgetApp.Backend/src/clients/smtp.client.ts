import { Transporter, createTransport } from "nodemailer";
import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_SSL, SMTP_USER } from "src/config";

export class Mailer {
    private readonly trasporter: Transporter;

    constructor() {
        this.trasporter = createTransport({
            host: SMTP_HOST,
            port: parseInt(SMTP_PORT),
            secure: SMTP_SSL === "true",
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD
            }
        });
    };

    async status(): Promise<boolean> {
        try {
            await this.trasporter.verify();
            return true;
        } catch (error) {
            console.log("[SMTP][ERROR]", error);
            return false;
        };
    };
};