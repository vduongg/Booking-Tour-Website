import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginForm } from 'src/app/models/LoginForm';
import { UserInfo } from 'src/app/models/UserInfo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "User"
  constructor(private http:HttpClient, private route: Router) { }
  public getAllUser():Observable<any>{
    return this.http.get<UserInfo[]>(`${environment.apiUrl}/${this.url}`);
  }
 

}
