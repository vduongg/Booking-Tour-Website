import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Tour } from 'src/app/models/Tour';
import { TourImage } from 'src/app/models/TourImage';
import { ImageService } from 'src/services/image.service';
import { TourDetailsService } from 'src/services/tour-details.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  isSuccess = false;
  isError = false;
  amount = 0;
  bankcode = "";
  orderId = 0;
  orderDate = "";
  faCheck = faCheckCircle;
  totalPeople = 0;
  tourId = 0 ;
  tourImageList:string[] = [];
  tourDetails: Tour = new Tour();

  constructor(private route:ActivatedRoute, private tourService:TourDetailsService, private imageService:ImageService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      if(params["vnp_ResponseCode"] == '00') {
         this.amount = params["vnp_Amount"];
        this.bankcode = params["vnp_BankCode"]
        this.orderId = params["vnp_OrderInfo"]
        this.orderDate = params["vnp_PayDate"]
        this.totalPeople = params["people"]
        this.isSuccess = true;
      }
      else if( params["vnp_ResponseCode"] != null){
        this.isError = true;
      }
      this.tourService.getTourDetails(params['tourId']).subscribe( (result:Tour) =>{
        this.tourDetails = result;
        this.imageService.getTourImage(result.tourId).subscribe((result:TourImage[])=>{
            result.forEach( r => {
              this.tourImageList.push(r.imageURL)
            });
        })
    })
   
      
  })
  }

}
