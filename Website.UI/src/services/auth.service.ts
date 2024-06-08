import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginForm } from 'src/app/models/LoginForm';
import { RegisterForm } from 'src/app/models/RegisterForm';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "Auth"
  private userPayload: any;
  constructor(private http:HttpClient, private route: Router) {
    this.userPayload = this.decodedToken();
   }
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
  public editStatusUser(id:number):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/${id}`);
    
  }
  public createUser(form:RegisterForm):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/${this.url}/register`,form);
  }
  decodedToken()
  {
    const jwt = new JwtHelperService();
    const token = this.getToken()!;
    return jwt.decodeToken(token);
  } 
  getFullNameFromToken(){
    if(this.userPayload)
      return this.userPayload.unique_name;
  }
  getRoleFromToken(){
    if(this.userPayload)
      return  this.userPayload.role;
  }
  
}
