import { IUser } from "../../interfaces";
import ResponseStatus from "../response";

export class AuthResponse extends ResponseStatus {
    constructor(
        public status  : number,
        public token   : string,
        public user    : IUser,
        public message?: string,
    ) {
        super(status, message);
    }
};