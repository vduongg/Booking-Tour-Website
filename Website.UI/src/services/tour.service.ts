import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TourDate } from 'src/app/models/TourDate';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private url = "Tour"
  constructor( private http:HttpClient  ) {

   }
   public getTourDate() :Observable<TourDate[]> {
    return this.http.get<TourDate[]>(`${environment.apiUrl}/${this.url}`)
   }
   public updateTourDate(tourdate : TourDate) :Observable<TourDate[]> {
    return this.http.put<TourDate[]>(`${environment.apiUrl}/${this.url}`,tourdate)
   }
   public createTourDate(tourdate : TourDate) :Observable<TourDate[]> {
    return this.http.post<TourDate[]>(`${environment.apiUrl}/${this.url}`,tourdate)
   }
  
}
