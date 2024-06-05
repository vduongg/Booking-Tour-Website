import { Component, OnInit } from '@angular/core';
import { RegisterForm } from 'src/app/models/RegisterForm';
import { AuthService } from 'src/services/auth.service';
import { EmailService } from 'src/services/email.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email = "";
  disableButton: boolean = false;
  countdown: number = 60;
  btnGetCode = "Nhận mã"
  registerForm:RegisterForm = new RegisterForm();
  constructor(private emailService:EmailService, private userService:UserService) { }

  ngOnInit(): void {
  }
  getCode() {
    this.email = this.registerForm.email
    this.emailService.sendRequestEmail(this.email).subscribe(
      response => {
        console.log(response)
      }
    )
    this.disableButton = true; 
    const countdownInterval = setInterval(() => {
      this.countdown--;
      this.btnGetCode = this.countdown.toString();
      if (this.countdown <= 0) {
        clearInterval(countdownInterval); 
        this.disableButton = false;
        this.countdown = 60
        this.btnGetCode = "Nhận mã"
      }
    }, 1000);
  }
  register(){
    this.userService.registerUser(this.registerForm).subscribe( result => {
      console.log(result);
    })
  }

}
