import { Transporter, createTransport } from "nodemailer";
import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_SSL, SMTP_USER } from "src/config";

export class Mailer {
    private readonly transporter: Transporter;

    constructor() {
        this.transporter = createTransport({
            host: SMTP_HOST,
            port: parseInt(SMTP_PORT),
            secure: (SMTP_SSL === "true") ? true : false,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD
            }
        });
    };

    async status(): Promise<boolean> {
        try {
            await this.transporter.verify();
            return true;
        } catch (error) {
            console.log("[SMTP][ERROR]", error);
            return false;
        };
    };

    async sendMail(
        sender: string,
        subject: string,
        to: string,
        template: string
    ): Promise<boolean> {
        try {
            await this.transporter.sendMail({
                from: sender,
                to,
                subject,
                html: template
            });

            return true;
        } catch (error) {
            return false;
        };
    };
};