import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/models/Vehicle';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private url = "tourType"

  constructor(private http:HttpClient) { }
  public createVehicle(vehicle : Vehicle) :Observable<Vehicle[]> {
    return this.http.post<Vehicle[]>(`${environment.apiUrl}/${this.url}`,vehicle)
   }
}
