import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  email = "";
  password = "";
  constructor(private userService:UserService) { 
    
  }

  ngOnInit(): void {
  }
  login(){
    this.userService.loginUser(this.email,this.password).subscribe( result => {
        if(result.message == "Login Success!") {
          this.userService.setToken(result.token)
          const tokenPayload = this.userService.decodedToken();
          this.userService.setFullNameFromStore(tokenPayload.unique_name);
          this.userService.setRoleForStore(tokenPayload.role);
          window.location.href = "/"
        }

    })
  }

}
