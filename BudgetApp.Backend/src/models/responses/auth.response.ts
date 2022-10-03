import { IUser } from "../../interfaces";
import ResponseStatus from "../response";

export class AuthResponse extends ResponseStatus {
    constructor(
        public statusCode  : number,
        public token       : string,
        public user        : IUser,
        public message?    : string,
    ) {
        super(statusCode, message);
    }
};