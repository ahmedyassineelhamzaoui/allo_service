import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PersistanceService } from './persistance.service';
import { RegisterRequestClientInterface } from '../types/registerRequestClient.interface';
import { ResponseWithDetailsInterface } from '../types/responseWithDetails.interface';


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
            .post<ResponseWithDetailsInterface>(environment.apiUrlAuth+'signup',data);
  }
}
