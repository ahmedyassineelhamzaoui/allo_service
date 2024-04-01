import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PersistanceService } from '../shared/services/persistance.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private persistanceService:PersistanceService) {}
  
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      const token = this.persistanceService.get('accessToken');
      if(token){
        return this.authService.isTokenValid().pipe(
          map((isValid : boolean) => {
            if (!isValid) {
              this.router.navigate(['/home']);
            }
              return isValid;
          })
        );
      }else{
        this.router.navigate(['/home']);
        return false;
      }
  }
  
}

