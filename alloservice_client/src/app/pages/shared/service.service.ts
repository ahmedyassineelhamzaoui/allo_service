import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AddServiceReqeustInterface } from './types/addServiceRequest.interface';
import { ResponseWithDetailsInterface } from '../../auth/shared/types/responseWithDetails.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  createService(data: AddServiceReqeustInterface, file: File): Observable<ResponseWithDetailsInterface> {
    const formData = new FormData();

    const dataBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    formData.append('request', dataBlob);

    formData.append('image', file, file.name);
    console.log(formData.get('request'));
    console.log(formData.get('image'));

    return this.http.post<ResponseWithDetailsInterface>(environment.apiURL + 'addservice', formData);
  }

  getAllServices(): Observable<ResponseWithDetailsInterface>{
    return this.http.get<ResponseWithDetailsInterface>(environment.apiURL + 'services');
  }
  getServiceDetails(id: string): Observable<ResponseWithDetailsInterface>{
    return this.http.get<ResponseWithDetailsInterface>(environment.apiURL + 'service/' + id);
  }
} 
