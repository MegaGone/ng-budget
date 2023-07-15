import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

import { IAccount, IAuthResponse, ILogin, ILoginResponse, IResponseStatus, ISession, ISetUpTwoFactor, IUser } from 'app/interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'app/models';
import { Router } from '@angular/router';
import { AuthUtils } from 'app/core/auth/auth.utils';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: IUser;

  /**
   * CURRENT USER
   */
  public currentUser: BehaviorSubject<IUser> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /**
   * 
   * @returns IAuthResponse
   */
  validateToken(): Observable<number> {
    return this.http.get<IAuthResponse>(`${base_url}/auth/renew`, { headers: { 'x-token': this.getToken } })
      .pipe(
        tap((res: IAuthResponse) => this.currentUser.next(res.user)),
        tap((res: IAuthResponse) => localStorage.setItem("x-token", res.token)),
        map((res: IAuthResponse) => res.statusCode),
        catchError(err => {
          console.log(err);
          return of(400);
        })
      )
  }

  /**
   * 
   * @param user - Account to create
   * @return StatusCode
   */
  createAccount(user: IAccount) {
    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/json");

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
  login(credentials: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${base_url}/auth/login`, credentials);
  };

  /**
   * 
   * @param code - OTP Verification code
   * @param uid - User ID
   * @returns Status code
   */
  verify2fa(code: string, uid: string): Observable<number> {
    return this.http.post<IAuthResponse>(`${base_url}/auth/verify-2fa`, { code, uid })
      .pipe(
        tap((res: IAuthResponse) => this.currentUser.next(res.user)),
        tap((res: IAuthResponse) => localStorage.setItem("x-token", res.token)),
        map((res: IAuthResponse) => res.statusCode ?? 500)
      );
  };

  /**
   * 
   * @param uid - User ID
   * @param seed - Token seed
   * @param code - OTP verification code
   * @returns Status code
   */
  setUp2fa(uid: string, seed: string, code: string): Observable<number> {
    try {
      return this.http.post(`${base_url}/auth/setup-2fa`, { uid, code, seed })
        .pipe(
          tap((res: ISetUpTwoFactor) => this.currentUser.next(res.user)),
          tap((res: ISetUpTwoFactor) => localStorage.setItem("x-token", res.token)),
          map((res: ISetUpTwoFactor) => res.statusCode ?? 500)
        );
    } catch (error) {
      return error;
    };
  };

  /**
   * 
   * @returns GET SESSION
   */
  getSession(): Observable<ISession> {
    return this.http.get<ISession>(`${base_url}/auth/session`, { headers: { 'x-token': this.getToken } })
      .pipe(
        tap((res: ISession) => this.currentUser.next(res.user))
        // catchError(err => of(false))
      );
  };

  checkAuthentication(): Observable<boolean> {
    if (!this.getToken) of(false);

    (AuthUtils.isTokenExpired(this.getToken)) ? this.validateToken().subscribe() : this.getSession().subscribe();
    return of(true);
  };

  /**
   * GET TOKEN
   */
  get getToken(): string {
    return localStorage.getItem("x-token") || "";
  }

  /**
   * 
   * @param user - Current user
   * @returns User role
   */
  get getRole(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role;
  }

  /**
   * 
   * @returns CURRENT USER AS OBSERVABLE
   */
  getCurrentUser(): Observable<IUser> {
    if (!this.currentUser.value || this.currentUser.value == undefined) {
      this.getSession().subscribe(res => {
        this.currentUser.next(res.user);
      })
    }
    return this.currentUser.asObservable();
  }

  /**
   * LOG OUT
   */
  logOut() {
    this.getSession().subscribe(res => {

      if (!res.user.google) {
        localStorage.removeItem('x-token');
        return this.router.navigateByUrl('/auth/login');
      }

    });
  }
};