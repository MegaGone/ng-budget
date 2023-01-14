import ResponseStatus from "../response";

export class CountryData<T> extends ResponseStatus {
    public languages?: T;
    public currencies?: T;

    constructor(
        public statusCode  : number,
        public message?    : string,
        languages?: T,
        currencies?: T,
    ) {
        super(statusCode, message);
        this.languages = languages
        this.currencies = currencies;
    }
}