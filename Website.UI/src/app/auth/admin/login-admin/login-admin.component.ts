import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/models/LoginForm';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  isOpenSuccess = false;
  isOpenError = false;
  LoginForm:LoginForm = new LoginForm();
  constructor(private authService: AuthService, private routeService :Router, private userService:UserService) { }

  ngOnInit(): void {
  }
  login(user: LoginForm) {
    this.authService.login(user).subscribe(
      response => {
        this.isOpenSuccess = true;
        this.isOpenError = false;
        this.authService.setToken(response.token)
        const tokenPayload = this.authService.decodedToken();
        this.userService .setFullNameFromStore(tokenPayload.name);
        this.userService.setRoleForStore(tokenPayload.unique_name);
        setTimeout(() => {
          this.routeService.navigate(['/admin/tour'])
        }, 1000);
       
      },
      error => {
        this.isOpenError = true;
      }
    );
  }
   close(status:string){
    if(status == "success") {
      this.isOpenSuccess = false;
    }
    if(status == "error") {
      this.isOpenError = false;
    }

   }

}
