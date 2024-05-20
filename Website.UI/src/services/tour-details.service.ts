import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from 'src/app/models/Tour';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourDetailsService {
  private url = 'Tour'
  constructor(private http:HttpClient) { }
  public getTourDetails(id?:number) :Observable<Tour> {
      return this.http.get<Tour>(`${environment.apiUrl}/${this.url}/${id}`)

  }
}
