import { IUser } from "app/interfaces";

export class User implements IUser {

    public email        : string;
    public name         : string;
    public lastName     : string;
    public displayName  : string;
    public avatar?      : string;
    public role         : "ADMIN_ROLE" | "USER_ROLE";
    public enabled      : boolean;
    public google       : boolean;
    public uid          : string;

    constructor(
        email       : string,
        name        : string,
        lastName    : string,
        displayName : string,
        avatar?     : string,
        role        : "ADMIN_ROLE" | "USER_ROLE" = "USER_ROLE",
        enabled     : boolean = true,
        google      : boolean = true,
        uid?        : string
    ) { 
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.displayName = displayName;
        this.avatar = avatar;
        this.role = role;
        this.enabled = enabled;
        this.google = google;
        this.uid = uid;
    }
    
}