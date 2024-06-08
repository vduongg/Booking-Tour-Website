import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoginGuard implements CanActivate {
  constructor(private userService: UserService, private route: Router){}
  canActivate():boolean{
    if(!this.userService.isLoggedIn()) {
      return true
      
    }
    else {
      this.route.navigate(['/'])
      return false
    }
  }
  
}
