import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ResponseWithDetailsInterface } from '../../auth/shared/types/responseWithDetails.interface';
import { UserRequestInterface } from './types/userRequest.interface';
import { EdituserRequestInterface } from './types/edituserRequest.interface';
import { UpdateUserInfoRequestnterface } from './types/updateUserInfoRequestInterface.interface';
import { UpdateUserDocumentinterface } from './types/updateUserDocument.interface';
import { BehaviorSubject } from 'rxjs';
import { UpdateUserPasswordRequest } from './types/updateUserPasswordRequest.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) {
      if (isPlatformBrowser(this.platformId)) {
        this.firstName.next(localStorage.getItem('firstName') || '');
      }
     }

  // we use this to emit the picture link to the navbar component
  private pictureLinkSource = new BehaviorSubject<string>('');
  pictureLink$ = this.pictureLinkSource.asObservable();

  updatePictureLink(pictureLink: string) {
    this.pictureLinkSource.next(pictureLink);
  }
  // end of method
  private userNameSource = new BehaviorSubject<string>('');
  userName$ = this.userNameSource.asObservable();
  updateUsername(userName: string) {
    this.userNameSource.next(userName);
  }
  private firstName = new BehaviorSubject<string>('');

  setFirstName(name: string) {
    this.firstName.next(name);
    localStorage.setItem('firstName', name);
  }

  getFirstName() {
    return this.firstName.asObservable();
  }

  getAllUsers(): Observable<ResponseWithDetailsInterface>{
    return this
            .http
            .get<ResponseWithDetailsInterface>(environment.apiURL+'users');
  }

  addUser(user:UserRequestInterface): Observable<ResponseWithDetailsInterface>{
    return this
            .http.post<ResponseWithDetailsInterface>(environment.apiURL+'adduser',user);
  }
  updateUser(data:EdituserRequestInterface): Observable<ResponseWithDetailsInterface>{
    return this
            .http.put<ResponseWithDetailsInterface>(environment.apiURL+'updateuser',data);
  }
  deleteUser(id:string): Observable<ResponseWithDetailsInterface>{
    return this
            .http.delete<ResponseWithDetailsInterface>(environment.apiURL+'deleteuser/'+id);
  }
  getUserInfo(id:string): Observable<ResponseWithDetailsInterface>{
    return this
            .http
            .get<ResponseWithDetailsInterface>(environment.apiURL+'userinfo/'+id);
  }
  getAuthenticUser(token: string): Observable<ResponseWithDetailsInterface> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ResponseWithDetailsInterface>(`${environment.apiURL}authenticatedUser`, { headers });
  }
  updateUserInfo(request:UpdateUserInfoRequestnterface,id:string): Observable<ResponseWithDetailsInterface>{
    return this
            .http
            .put<ResponseWithDetailsInterface>(environment.apiURL+'updateUserInfo/'+id,request);
  }
  updateUserDocument(data:UpdateUserDocumentinterface,file:File,id:string): Observable<ResponseWithDetailsInterface>{
    const formData = new FormData();

    const dataBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    formData.append('request', dataBlob);
    if (file.name !== null) {
      formData.append('file', file, file.name);
    }  
    return this
            .http
            .put<ResponseWithDetailsInterface>(environment.apiURL+'updateUserDocument/'+id,formData);
  }

  updateUserAvatar(file:File,id:string): Observable<ResponseWithDetailsInterface>{
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this
            .http
            .put<ResponseWithDetailsInterface>(environment.apiURL+'updateUserAvatar/'+id,formData);
  }

  updateUserPassword(request:UpdateUserPasswordRequest,id:string): Observable<ResponseWithDetailsInterface>{
    return this
            .http
            .put<ResponseWithDetailsInterface>(environment.apiURL+'updateUserPassword/'+id,request);
  }

  logout(){
    return this.http.get(environment.apiURL + 'logout');
  }


}
