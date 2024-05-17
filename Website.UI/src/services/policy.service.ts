import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TourPolicy } from 'src/app/models/TourPolicy';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  private url = "Policy"

  constructor(private http:HttpClient) { }
  public getTourDate() :Observable<TourPolicy[]> {
    return this.http.get<TourPolicy[]>(`${environment.apiUrl}/${this.url}`)
   }
  public createTourPolicy(policy : TourPolicy) :Observable<TourPolicy[]> {
    return this.http.post<TourPolicy[]>(`${environment.apiUrl}/${this.url}`,policy)
   }
}
