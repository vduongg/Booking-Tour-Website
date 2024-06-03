import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from 'src/app/models/Tour';
import { TourDate } from 'src/app/models/TourDate';
import { TourImage } from 'src/app/models/TourImage';
import { TourPolicy } from 'src/app/models/TourPolicy';
import { TourType } from 'src/app/models/TourType';
import { ImageService } from 'src/services/image.service';
import { PolicyService } from 'src/services/policy.service';
import { TourDetailsService } from 'src/services/tour-details.service';
import { TourTimeService } from 'src/services/tour-time.service';
import { TourTypeService } from 'src/services/tour-type.service';
import { TourService } from 'src/services/tour.service';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {

  constructor(private imageService:ImageService, private routeService:ActivatedRoute, private tourService:TourDetailsService, private policyService:PolicyService,
    private tourTimeService: TourTimeService, private tourTypeService:TourTypeService, private route:Router
  ) { }
  num?:number;
  departureDate?:Date;
  tourImageList:string[] = [];
  tourDetails: Tour = new Tour();
  position = 0;
  policy:TourPolicy = new TourPolicy();
  date:TourDate = new TourDate();
  type:TourType = new TourType();
  ngOnInit(): void {
    this.routeService.params.subscribe(params => {
      this.tourService.getTourDetails(params['id']).subscribe( (result:Tour) =>{
            this.tourDetails = result;
            this.imageService.getTourImage(result.tourId).subscribe((result:TourImage[])=>{
                result.forEach( r => {
                  this.tourImageList.push(r.imageURL)
                });
            })
            this.policyService.getTourPolicyDetail(result.policyId).subscribe(result => {
                  this.policy = result;
            })
            this.tourTimeService.getTourDateDetail(result.tourDateId).subscribe(result => {
              this.date = result;
            })
          this.tourTypeService.getTourTypeDetail(result.tourTypeId).subscribe(result => {
                  this.type = result;
            })
      })
    })
    
  }
  arrowNext() {
    this.position = (this.position + 1 ) % this.tourImageList.length
    
  }
  arrowBack() {
   this.position = (this.position - 1 + this.tourImageList.length ) % this.tourImageList.length
  
  }
  payment() {
    this.route.navigate(['/payments'],{ queryParams:{
      tourName: this.tourDetails.tourName,
      departureDate: this.departureDate,
      price: this.tourDetails.tourPrice,
      num: this.num,
      tourId: this.tourDetails.tourId,
    }})
  }

}
