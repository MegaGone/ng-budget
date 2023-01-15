import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICurrency, ISettings } from 'app/interfaces';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private _http: HttpClient) { }

  /**
 * GET TOKEN
 */
  get getToken(): string {
    return localStorage.getItem("x-token") || "";
  }

  /**
   * 
   * @returns GET CURRENCIES
   */
  getCurrencies(): Observable<ICurrency[]> {
    return this._http.get<ISettings>(`${base_url}/profile/currencies`, { headers: { 'x-token': this.getToken } })
      .pipe(
        map((res: ISettings) => res.currencies),
        catchError(err => [])
      )
  }

  /**
   * 
   * @returns GET LANGUAGES
   */
  getLanguages() {
    // return this._http.get(`${base_url}/profile/languages`, { headers: { 'x-token': this.getToken } });
  }
};