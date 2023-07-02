import { Document } from "mongoose";

export interface ITemplateModel extends Document {
    identificator?: string;
    from: string;
    subject: string;
    template: string;
    fields: string[];
};