import ResponseStatus from "./response";

export class UserResponse extends ResponseStatus {
    constructor(
        public statusCode: number,
        public user: any
    ) { 
        super(statusCode);
    }
};

export class UsersResponse extends ResponseStatus {
    constructor(
        public statusCode   : number,
        public users        : any[],
        public total        : number,
        public page?        : number,
        public totalPage?   : number,
        public pageSize?    : number
    ) {
        super(statusCode);
    }
};