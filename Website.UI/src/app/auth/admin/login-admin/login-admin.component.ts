import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/models/LoginForm';
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
  constructor(private userService: UserService, private routeService :Router) { }

  ngOnInit(): void {
  }
  login(user: LoginForm) {
    this.userService.login(user).subscribe(
      response => {
        this.isOpenSuccess = true;
        this.isOpenError = false;
        this.userService.setToken(response.token)
        setTimeout(() => {
          this.routeService.navigate(['/admin/home'])
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
