import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  role = ""
  constructor(private authService:AuthService, private route: Router, private userService:UserService){}
  canActivate():boolean{
    this.userService.getRoleFromStore().subscribe( result => {
      const getRoleFromToken = this.authService.getRoleFromToken();
      this.role = result || getRoleFromToken;
    })
    if(this.role == "Admin") {
      return true
    }
    else {
      this.route.navigate(['/admin/tour'])
      return false
    }
  }
  
}
