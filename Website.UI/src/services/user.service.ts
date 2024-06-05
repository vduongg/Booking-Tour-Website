import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginForm } from 'src/app/models/LoginForm';
import { RegisterForm } from 'src/app/models/RegisterForm';
import { UserInfo } from 'src/app/models/UserInfo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private fullname$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private url = "User"
  constructor(private http:HttpClient, private route: Router) { }
  public getAllUser():Observable<any>{
    return this.http.get<UserInfo[]>(`${environment.apiUrl}/${this.url}`);
  }
  public registerUser(form:RegisterForm){
    return this.http.post<any>(`${environment.apiUrl}/${this.url}/register`,form)
  }
   public loginUser(email:string, password:string) {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/${email}/${password}`);
  }
  public logOut(){
    localStorage.clear()
    this.route.navigate(['/login'])
  }
  public setToken(tokenValue:string) {
    localStorage.setItem('user',tokenValue)
  }
  public getToken(){
    return localStorage.getItem('user')
  }
  public isLoggedIn():boolean {
    return !!localStorage.getItem('user')
  }
  public getRoleFromStore(){
    return this.role$.asObservable()
  }
  public setRoleForStore(role:string){
    this.role$.next(role);
  }
  public getFullNameFromStore(){
    return this.fullname$.asObservable();
  }
  public setFullNameFromStore(fullname:string){
    return this.fullname$.next(fullname);
  }
  decodedToken()
  {
    const jwt = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwt.decodeToken(token))
    return jwt.decodeToken(token);
  } 

}
