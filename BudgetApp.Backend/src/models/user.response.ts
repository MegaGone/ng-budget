import ResponseStatus from "./response";

class UserResponse extends ResponseStatus {
    constructor(
        public statusCode: number,
        public user: any
    ) { 
        super(statusCode)
    }
}

export default UserResponse;