import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { paymentRequest } from 'src/app/models/paymentRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  url = "Payment"
  constructor(private http:HttpClient) { }

  
  public createOrder(order:paymentRequest):Observable<any> { 
    return this.http.post<any>(`${environment.apiUrl}/${this.url}`,order);
  }
}
