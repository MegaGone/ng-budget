import { Document } from "mongoose";

interface IUser extends Document {
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
}

export default IUser;