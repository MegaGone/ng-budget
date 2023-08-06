import { User } from "app/core/user/user.types";
import { IStatusCode } from "./";

export interface ILogin extends IStatusCode {
    uid: string;
    data?: string;
    secret?: string;
};

export interface IVerifyOtp extends IStatusCode {
    token: string;
    user: User;
};