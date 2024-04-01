import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PersistanceService } from './persistance.service';
import { RegisterRequestClientInterface } from '../types/registerRequestClient.interface';
import { ResponseWithDetailsInterface } from '../types/responseWithDetails.interface';
import { environment } from '../../../../environments/environment.development';
import { MailRequestInterface } from '../types/mailRequest.interface';
import { CurrentUserInterface } from '../types/currentUser.interface';
import { HttpHeaders } from '@angular/common/http';
import { RegisterRequestWorkerInterface } from '../types/registerRequestWorker.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logoutEvent = new Subject<void>();

  private readonly validationUrl = environment.apiUrlAuth + 'validate-token';

  constructor(private http:HttpClient, private persistanceService: PersistanceService) { }
  token = this.persistanceService.get('accessToken');
  googleToken: string = "";


  registerClient(data: RegisterRequestClientInterface): Observable<ResponseWithDetailsInterface>{
    return this
            .http
            .post<ResponseWithDetailsInterface>(environment.apiUrlAuth+'signup_client',data);
  }
  login(data: LoginRequestInterface): Observable<CurrentUserInterface>{
    return this
            .http
            .post<CurrentUserInterface>(environment.apiUrlAuth+'login',data);
  }
  registerWorker(data: RegisterRequestWorkerInterface): Observable<ResponseWithDetailsInterface>{
    return this
            .http
            .post<ResponseWithDetailsInterface>(environment.apiUrlAuth+'signup_worker',data);
  }
  verifyEmail(data: MailRequestInterface): Observable<CurrentUserInterface>{
    return this
            .http
            .post<CurrentUserInterface>(environment.apiUrlAuth+'verify-email',data);
  }
  setToken(token: string): void {
    this.token = token;
  }
  isTokenValid(): Observable<boolean> {
    const mytoken = this.persistanceService.get('accessToken');
    return this.http.post<boolean>(this.validationUrl, { token: mytoken });
  }
  
  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(environment.apiUrlAuth+'isAuthenticated');
  }
}
