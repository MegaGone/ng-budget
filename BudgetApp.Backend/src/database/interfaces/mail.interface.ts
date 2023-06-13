import { Document } from "mongoose";

export interface IEmailModel extends Document {
    identificator?: string;
    from: string;
    subject: string;
    template: string;
};