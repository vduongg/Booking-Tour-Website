import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  email = "";
  password = "";
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  login(){
    this.userService.loginUser(this.email,this.password).subscribe( result => this.userService.setToken(result.token))
  }
  

}
