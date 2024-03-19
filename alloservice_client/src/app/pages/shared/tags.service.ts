import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagInterface } from './types/tag.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http:HttpClient) { }

  getAllTags(): Observable<TagInterface> {
    return this.http.get<TagInterface>(environment.apiURL+'tags');
  }
}
