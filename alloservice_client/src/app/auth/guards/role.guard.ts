import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PersistanceService } from '../shared/services/persistance.service';
import { SharedService } from '../../pages/shared/shared.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  private roles: { role: string, permissions: string[] }[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService
  ) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // this.sharedService.hasRole('ROLE_ADMIN');

    return this.authService.isTokenValid().pipe(
      map((isValid: boolean) => {

        const hasAdminRole = this.sharedService.hasRole('ROLE_ADMIN');
        const hasSuperAdminRole = this.sharedService.hasRole('ROLE_SUPER_ADMIN');

        if (!isValid) {
          this.router.navigate(['/login']);
          return false;
        }else if(!(hasAdminRole || hasSuperAdminRole)){
          this.router.navigate(['/403']);
          return false;
        }
        return true;
      })
    );
  }

}

