import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginForm } from 'src/app/models/LoginForm';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "User"
  constructor(private http:HttpClient) { }
  public login(user:LoginForm):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/${this.url}/authentication`,user);
  }
}
