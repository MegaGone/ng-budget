import { Injectable } from "@angular/core";

@Injectable()
export class TokenService {

    constructor() { };

    set setCredentials(credentials: { rememberMe: boolean; email: string }) {
        (credentials.rememberMe) ? localStorage.setItem("credentials", JSON.stringify(credentials)) : localStorage.removeItem("credentials");
    };

    get getCredentials() {
        return JSON.parse(localStorage.getItem("credentials"));
    };
};