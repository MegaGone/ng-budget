import { Document } from "mongoose";
import { ROLE_ENUM } from "src/enums";

export interface IUserModel extends Document {
    email       : string;
    name        : string;
    lastName    : string;
    displayName : string;
    password    : string;
    avatar?     : string;
    role        : ROLE_ENUM;
    enabled     : boolean;
    google      : boolean;
    uid         ?: string;
};