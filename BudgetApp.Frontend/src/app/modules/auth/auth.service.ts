import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map, tap } from 'rxjs/operators';

import { IAccount, IAuthResponse, ILogin, IResponseStatus } from 'app/interfaces';
import { Observable } from 'rxjs';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TODO: RENEW TOKEN SERVICE

  constructor(private http: HttpClient) { }

  /**
   * 
   * @param user - Account to create
   * @return StatusCode
   */
  createAccount(user: IAccount) {
    let headers: Headers = new Headers();
    headers.append("Content-Type","application/json");

    return this.http.post<IResponseStatus>(`${base_url}/auth/register`, user)
      .pipe(
        map((res: IResponseStatus) => res.statusCode)
      );
  }

  /**
   * 
   * @param credentials User credentials
   * @returns IAuthResponse
   */
  login(credentials: ILogin): Observable<number> {
    return this.http.post<IAuthResponse>(`${base_url}/auth/login`, credentials)
      .pipe(
        tap((res: IAuthResponse) => {
          localStorage.setItem("x-token", res.token);
        }),
        map((res: IAuthResponse) => res.statusCode)
      )
  }
}
