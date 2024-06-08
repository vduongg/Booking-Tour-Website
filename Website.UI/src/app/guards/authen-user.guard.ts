import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenUserGuard implements CanActivate {
  constructor(private userService: UserService, private route: Router){}
  canActivate():boolean{
    if(this.userService.isLoggedIn()) {
      return true
      
    }
    else {
      window.location.href = "/login"
      return false
    }
  }
  
}
