import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PersistanceService } from '../shared/services/persistance.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private persistanceService:PersistanceService,
    private router:Router,
    private authService:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.persistanceService.get('accessToken');
    if(token){
    if(!this.shouldIntercept(request.url)) {
     
        if(this.authService.isTokenValid()){
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }  
          });
        }else{
          this.router.navigate(['/login']);
        }
      }else{
        this.router.navigate(['/login']);
      }
      return next.handle(request);
    }
    return next.handle(request);
  }

  shouldIntercept(url: string) {
    return this.isExcludedUrl(url); 
  }

  isExcludedUrl(url: string) {
    return url.includes('/home') || 
           url.includes('/login') ||
           url.includes('/about') ||
           url.includes('/contact') ||
           url.includes('/signup-worker') ||
           url.includes('/signup-user') ||
           url.includes('/verify-email');
  }

}
