import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from 'src/app/models/Tour';
import { TourDate } from 'src/app/models/TourDate';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourService {
 
  private url = "Tour"
  constructor( private http:HttpClient  ) {

   }
   public getTour() :Observable<Tour[]> {
    return this.http.get<Tour[]>(`${environment.apiUrl}/${this.url}`)
   }
  
   public createTour(tour : Tour) :Observable<Tour[]> {
    return this.http.post<Tour[]>(`${environment.apiUrl}/${this.url}`,tour)
   }
}
