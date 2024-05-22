import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService:UserService, private route: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url !== "https://esgoo.net/api-tinhthanh/1/0.htm") {
       const myToken =  this.userService.getToken();
      if(myToken){
        request = request.clone({
          setHeaders: {Authorization: `Bearer ${myToken}`}
        })
      }
      return next.handle(request).pipe(
        catchError((err:any)=>{
          if(err instanceof HttpErrorResponse){
            if(err.status == 401) {
              this.route.navigate(['admin/login'])
            }
          }
          return throwError(() => new Error("Some other error"))
        })
        );
      }
    else {
      return next.handle(request)
    }
  }
   
}
