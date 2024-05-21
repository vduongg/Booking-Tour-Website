import { Component, OnInit } from '@angular/core';
import { LoginForm } from 'src/app/models/LoginForm';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  LoginForm:LoginForm = new LoginForm();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  login(user: LoginForm) {
    this.userService.login(user).subscribe(
      response => {
        console.log(response.message); 
      },
      error => {
        console.error('Error:', error);
      }
    );
    
  }

}
