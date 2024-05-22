import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router){}
  canActivate():boolean{
    if(this.authService.isLoggedIn()) {
      return true
    }
    else {
      this.route.navigate(['/admin/login'])
      return false
    }
  }
    
  
  
}
