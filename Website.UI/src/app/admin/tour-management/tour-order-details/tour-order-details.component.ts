import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Tour } from 'src/app/models/Tour';
import { updateOrderForm } from 'src/app/models/updateOrderForm';
import { OrderService } from 'src/services/order.service';
import { TourDetailsService } from 'src/services/tour-details.service';

@Component({
  selector: 'app-tour-order-details',
  templateUrl: './tour-order-details.component.html',
  styleUrls: ['./tour-order-details.component.css']
})
export class TourOrderDetailsComponent implements OnInit {

  status = "";
  refund = 0;
  @Input() orderDetails:Order = new Order();
  tour: Tour = new Tour();
  constructor(private orderService:OrderService, private tourService:TourDetailsService) { }

  ngOnInit(): void {
    this.tourService.getTourDetails(this.orderDetails.tourId).subscribe( (result:Tour) =>
    this.tour = result )
  }
  updateOrder() {
    if(this.status != null) {
      let form:updateOrderForm = new updateOrderForm();
      form.orderId = this.orderDetails.orderId;
      form.status = this.status
      form.refund = this.refund
       this.orderService.updateOrder(form).subscribe( () => 
          window.location.reload()
       )
    }
  }

}
