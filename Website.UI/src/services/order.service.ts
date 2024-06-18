import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { updateOrderForm } from 'src/app/models/updateOrderForm';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url =  "Order"
  constructor(private http:HttpClient) { }

  public getListOrder():Observable<Order[]>{
      return this.http.get<Order[]>(`${environment.apiUrl}/${this.url}`)
  }
  public getTopOrder():Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/GetTop`)
  }
  public getOrderUser(userId:number):Observable<Order[]>{
    return this.http.get<Order[]>(`${environment.apiUrl}/${this.url}/${userId}`)
  }
  public updateOrder(form:updateOrderForm){

    return this.http.put(`${environment.apiUrl}/${this.url}`,form)
  }
}
