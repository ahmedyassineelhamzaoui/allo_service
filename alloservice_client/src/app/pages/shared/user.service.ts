import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ResponseWithDetailsInterface } from '../../auth/shared/types/responseWithDetails.interface';
import { UserRequestInterface } from './types/userRequest.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  
  getAllUsers(): Observable<ResponseWithDetailsInterface>{
    return this
            .http
            .get<ResponseWithDetailsInterface>(environment.apiURL+'users');
  }

  addUser(user:UserRequestInterface): Observable<string>{
    return this
            .http.post<string>(environment.apiURL+'adduser',user);
  }
}
