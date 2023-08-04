import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  set rememberCredentials(credentials: { rememberMe: boolean; email: string; }) {
    (credentials.rememberMe) ? localStorage.setItem("credentials", JSON.stringify(credentials)) : localStorage.removeItem("credentials");
  };
}
