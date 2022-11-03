import { IField } from "../interfaces";

class ResponseStatus {
    constructor(
        public statusCode   : number,
        public message?     : string,
        public errors?      : IField[] 
    ) { }
}

export default ResponseStatus;