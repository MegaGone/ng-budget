import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { ILogin, IRegister, IStatusCode, IVerifyOtp, Setup2fa } from 'app/interfaces';

const API_URL = environment.API_URL;
@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    };

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    };

    signIn(credentials: { email: string; password: string }): Observable<ILogin> {
        if (this._authenticated) return throwError('User is already logged in.');

        return this._httpClient.post<ILogin>(`${API_URL}auth/login`, credentials);
    };

    verifyOtp(request: { code: string; uid: string }) {
        if (this._authenticated) return throwError('User is already logged in.');

        return this._httpClient.post(`${API_URL}auth/verify-2fa`, request).pipe(
            switchMap((response: IVerifyOtp) => {
                console.log(response.user);
                // TODO: VALIDATE THIS CODE
                // this.accessToken = response.token;
                // this._authenticated = true;
                // this._userService.user = response.user;
                // console.log(this._userService.user);
                return of(response);
            })
        );
    };

    setupOtp({ code, uid, seed }: { code: string, uid: string, seed: string }) {
        if (this._authenticated) return throwError('User is already logged in.');

        return this._httpClient.post(`${API_URL}auth/setup-2fa`, { code, uid, seed }).pipe(
            switchMap((response: Setup2fa) => {
                return of(response);
            })
        );
    };

    verifyEmail(email: string): Observable<IStatusCode> {
        if (this._authenticated) return throwError('User is already logged in.');

        return this._httpClient.post<IStatusCode>(`${API_URL}auth/verify-email`, email);
    };

    // signIn(credentials: { email: string; password: string }): Observable<any> {

    //     if (this._authenticated) return throwError('User is already logged in.');

    //     return this._httpClient.post(`${API_URL}auth/login`, credentials).pipe(
    //         switchMap((response: ILogin) => {
    //             // this.accessToken = response.accessToken;
    //             // this._authenticated = true;
    //             // this._userService.user = response.user;
    //             return of(response);
    //         })
    //     );
    // };

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Renew token
        return this._httpClient.post('api/auth/refresh-access-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    };

    verifyCode(code: number) {
        return this._httpClient.get(`${API_URL}auth/${code}`);
    };

    activateUser(request: { code: number; password: string }) {
        return this._httpClient.post(`${API_URL}auth/activate-user`, request);
    };

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     */
    signUp(user: { name: string; lastName: string; email: string; password: string; }): Observable<IRegister> {
        return this._httpClient.post<IRegister>(`${API_URL}auth/register`, user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
