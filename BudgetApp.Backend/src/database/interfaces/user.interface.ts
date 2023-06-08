import { Document } from "mongoose";

export interface IUserModel extends Document {
    email       : string;
    name        : string;
    lastName    : string;
    displayName : string;
    password    : string;
    avatar?     : string;
    role        : string[];
    enabled     : boolean;
    google      : boolean;
    uid         ?: string;
};