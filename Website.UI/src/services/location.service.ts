import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListLocation } from 'src/app/models/ListLocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiUrl =  "https://esgoo.net/api-tinhthanh/1/0.htm"
  constructor(private http:HttpClient ) { }
  public getListLocation() : Observable<ListLocation>{
    return this.http.get<ListLocation>(this.apiUrl)
  }
}
