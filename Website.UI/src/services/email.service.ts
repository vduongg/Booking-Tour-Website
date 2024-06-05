import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private url = "Email"
  constructor(private http:HttpClient) { }

  public sendRequestEmail(email:string){
    return this.http.get(`${environment.apiUrl}/${this.url}/${email}`)
  }

}
