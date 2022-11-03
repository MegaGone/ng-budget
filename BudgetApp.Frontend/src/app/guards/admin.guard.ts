import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'app/modules';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this._authService.validateToken().subscribe(res => {
      
      if (res === 200) {
        if (this._authService.getRole === "ADMIN_ROLE") {
          return true;
        } else {
          this.router.navigate(['/expenses'])
          return;
        }
      }
    });

    return true;
  }
}
