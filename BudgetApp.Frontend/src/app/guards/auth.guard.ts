import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'app/modules';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authSvc: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this._authSvc.validateToken().subscribe(res => {

      console.log(res);
      
      if (res != 200) {
        this.router.navigateByUrl("/home/login")
      }

    });

    console.log('CANACTIVATE GUARD');
    return true;
  }

}
