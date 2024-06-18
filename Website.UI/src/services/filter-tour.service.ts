import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterForm } from 'src/app/models/FilterForm';
import { Tour } from 'src/app/models/Tour';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterTourService {

  url ="Filter"
  constructor(private http:HttpClient) { }
  public getFilter(form:FilterForm):Observable<Tour[]>{
    return this.http.post<Tour[]>(`${environment.apiUrl}/${this.url}`,form)
  }
}
