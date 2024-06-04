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
  public getTourPolicy() :Observable<TourPolicy[]> {
    return this.http.get<TourPolicy[]>(`${environment.apiUrl}/${this.url}`)
   }
   public getTourPolicyDetail(id:any) :Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/${id}`)
   }
  public createTourPolicy(policy : TourPolicy) :Observable<TourPolicy[]> {
    return this.http.post<TourPolicy[]>(`${environment.apiUrl}/${this.url}`,policy)
   }
   public updateTourPolicy(policy : TourPolicy){
    return this.http.put(`${environment.apiUrl}/${this.url}`,policy)
   }
}
