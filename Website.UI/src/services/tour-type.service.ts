import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TourType } from 'src/app/models/TourType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourTypeService {
  private url = "TourType"

  constructor(private http:HttpClient) { }
  public getTourType() :Observable<TourType[]> {
    return this.http.get<TourType[]>(`${environment.apiUrl}/${this.url}`)
   }
  public createTourType(tourType : TourType) :Observable<TourType[]> {
    return this.http.post<TourType[]>(`${environment.apiUrl}/${this.url}`,tourType)
   }

}
