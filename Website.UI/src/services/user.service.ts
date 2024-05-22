import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginForm } from 'src/app/models/LoginForm';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "User"
  constructor(private http:HttpClient, private route: Router) { }
  public login(user:LoginForm):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/${this.url}/authentication`,user);
  }
  public logOut(){
    localStorage.clear()
    this.route.navigate(['/admin/login'])
  }
  public setToken(tokenValue:string) {
    localStorage.setItem('token',tokenValue)
  }
  public getToken(){
    return localStorage.getItem('token')
  }
  public isLoggedIn():boolean {
    return !!localStorage.getItem('token')
  }

}
