import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { window } from 'rxjs';
import { UserInfoForm } from 'src/app/models/UserInfoForm';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  email ="";
  userInfo = true;
  changePass = false;
  changeInfo = false;

  constructor(private userService:UserService) { }
  userForm: UserInfoForm = new UserInfoForm;
  ngOnInit(): void {
     this.email = this.userService.decodedToken().email;
     this.userService.getUserInfo(this.email).subscribe(
      result => this.userForm = result
     )
  }
  changeInfoClick(){
    if(this.userInfo == true){
      this.userInfo = !this.userForm
    }
     this.changeInfo = !this.changeInfo 
  }
  changePassClick(){
    if(this.userInfo == true){
      this.userInfo = !this.userForm
    }
     this.changePass = !this.changePass 
  }
  back(){
    this.userInfo = true;
    this.changeInfo = false;
    this.changePass = false;
  }
  changeInfoOk(){
    this.userService.changeUserInfo(this.userForm).subscribe(
      result =>  {
        if(result.message == "Changed Success")
          {
            this.back();
          }
      }
    )
  }
  onKeyPress( event: KeyboardEvent) {
    const inputChar = event.key;
    if (!(inputChar >= 'a' && inputChar <= 'z') && (!(inputChar >= 'A' && inputChar <= 'Z')) ) {
      event.preventDefault(); 
    }
  }
  onNumPress( event: KeyboardEvent) {
    const inputChar = event.key;
    if (isNaN(Number(inputChar))) {
      event.preventDefault(); 
    }
  }
 


}
