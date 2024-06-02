import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  @Input() tourName?:string;
  @Input() tourPrice?:number;
  @Input() departureDate:Date = new Date();
  @Input() num?: number;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe( params =>{
      this.tourName = params["tourName"],
      this.departureDate = params["departureDate"]
      this.tourPrice = params["price"]
      this.num = params["num"]
    })
  }

}
