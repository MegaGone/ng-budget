import { IUser } from "./IAuth";

export interface ISession {
    statusCode: number;
    user      : IUser;
};