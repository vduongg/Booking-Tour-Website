import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfoForm } from 'src/app/models/UserInfoForm';
import { paymentRequest } from 'src/app/models/paymentRequest';
import { PaymentsService } from 'src/services/payments.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  fullname = "";
  email = "";
  phoneNum = "";
  note = "";
  payment: paymentRequest = new paymentRequest();
  tourName?:string;
  tourPrice:number = 0;
  departureDate:Date = new Date();
  num : number = 0;
  tourId: number = 0;
  userForm: UserInfoForm = new UserInfoForm;

  constructor(private route:ActivatedRoute, private paymentService: PaymentsService, private userService:UserService) { }

  ngOnInit(): void {
    this.email = this.userService.decodedToken().email;
     this.userService.getUserInfo(this.email).subscribe(
      result => 
        {
          this.userForm = result
          this.fullname = this.userForm.firstName + this.userForm.lastName
          this.phoneNum = this.userForm.phoneNumber
        }
      
     )
   
    this.route.queryParams.subscribe( params =>{
      this.tourName = params["tourName"],
      this.departureDate = params["departureDate"]
      this.tourPrice = params["price"]
      this.num = params["num"]
      this.tourId = params["tourId"]
    })
  }
  createOrder(){
    
    this.payment.phoneNumber = this.phoneNum
    this.payment.tourId = this.tourId;
    this.payment.totalPeople = this.num;
    this.payment.fullName = this.fullname;
    this.payment.description = this.note;
    this.payment.email = this.email;
    this.payment.description = this.note;
    this.payment.departureDate = this.departureDate;
    this.payment.userId = Number(this.userForm.userId);
    this.payment.totalPrice = this.num * this.tourPrice
    this.paymentService.createOrder(this.payment).subscribe(
      (response) => {
        window.location.href = response.payUrl;
      }
    );
  }
}
