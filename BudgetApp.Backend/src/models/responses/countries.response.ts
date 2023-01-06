import { ICurrency } from "../../interfaces";
import ResponseStatus from "../response";

export class CountryResponse extends ResponseStatus {
    constructor(
        public statusCode  : number,
        public countries?  : ICurrency[],
        public message?    : string,
    ) {
        super(statusCode, message);
    }
};