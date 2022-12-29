class ResponseStatus {
    constructor(
        public statusCode   : number,
        public message?     : string
    ) { }
}

export default ResponseStatus;