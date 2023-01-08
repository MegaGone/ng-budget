import ResponseStatus from "../response";

export class CountryData<T> extends ResponseStatus {
    public data: T;

    constructor(
        data: T,
        public statusCode  : number,
        public message?    : string,
    ) {
        super(statusCode, message);
        this.data = data;
    }
}