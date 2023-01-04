import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

import { IAccount, IAuthResponse, ILogin, IResponseStatus, ISession, IUser } from 'app/interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'app/models';
import { Router } from '@angular/router';

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
        tap((res: IAuthResponse) => {
          
          if (res.statusCode === 200) {
            const { email, name, lastName, displayName, avatar, role, enabled, google, uid } = res.user;
            this.user = new User(email, name, lastName, displayName, avatar, role, enabled, google, uid);
            localStorage.setItem("x-token", res.token)
          }

        }),
        map((res: IAuthResponse) => res.statusCode),
        catchError(err => of(400))
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
  login(credentials: ILogin): Observable<number> {
    return this.http.post<IAuthResponse>(`${base_url}/auth/login`, credentials)
      .pipe(
        tap((res: IAuthResponse) => {
          this.currentUser.next(res.user);
          localStorage.setItem("x-token", res.token);
        }),
        map((res: IAuthResponse) => res.statusCode)
      )
  }

  getSession(): Observable<ISession> {
    return this.http.get<ISession>(`${base_url}/auth/session`, { headers: { 'x-token': this.getToken } })
      .pipe(
        tap((res: ISession) => {
          catchError(err => of(false))
        }),
      )
  }

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
}
