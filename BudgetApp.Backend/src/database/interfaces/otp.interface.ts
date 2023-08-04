import { Document } from "mongoose";

export interface IOtpModel extends Document {
    user: string;
    code: number;
    createdAt: Date;
    expiresAt: Date;
};