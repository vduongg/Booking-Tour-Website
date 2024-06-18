import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  url = "Statistic"
  constructor(private http:HttpClient) { }
  public getRevenueMonth(year:number) {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/${year}`)
  } 
}
