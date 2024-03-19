import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagInterface } from './types/tag.interface';
import { environment } from '../../../environments/environment.development';
import { ResponseWithDetailsInterface } from '../../auth/shared/types/responseWithDetails.interface';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http:HttpClient) { }

  getAllTags(): Observable<ResponseWithDetailsInterface> {
    return this.http.get<ResponseWithDetailsInterface>(environment.apiURL+'tags');
  }
}
