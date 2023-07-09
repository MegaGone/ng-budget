import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'app/modules';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authSvc: AuthService,
    private router: Router
  ) { }

  private checkAuthStatus(): Observable<boolean> {
    return this._authSvc.checkAuthentication().pipe(
      tap(isAuthenticated => console.log(isAuthenticated)),
      tap(isAuthenticated => {
        if (!isAuthenticated) this.router.navigate(["./auth/login"])
      })
    );
  };

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

  //   this._authSvc.validateToken().subscribe(res => {

  //     if (res != 200) {
  //       return this.router.navigateByUrl("/home/login")
  //     }

  //   });

  //   return true;
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  };
}