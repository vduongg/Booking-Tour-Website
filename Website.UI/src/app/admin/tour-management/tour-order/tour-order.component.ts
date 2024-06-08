import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-tour-order',
  templateUrl: './tour-order.component.html',
  styleUrls: ['./tour-order.component.css']
})
export class TourOrderComponent implements OnInit {

  itemInPage = 10;
  pageNow = 1;
  numPage = 1;
  totalItem = 0;
  listOrder:Order[] = []
  isDetails = false
  orderDetails: Order = new Order();
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
      this.orderService.getListOrder().subscribe( (result:Order[]) =>{
        this.listOrder = result
        this.totalItem = this.listOrder.length
      })
  }
  pageItem() {
    let item: number[] = [];
  if (this.pageNow <= 0 || this.totalItem <= 0 || this.itemInPage <= 0) {
    return item;
  }
  
  const startIndex = this.totalItem - (this.pageNow - 1) * this.itemInPage;
  const endIndex = Math.max(startIndex - this.itemInPage + 1, 1);

  for (let i = startIndex; i >= endIndex; i--) {
    item.push(i);
  }
 
  return item;

  }
  
 

  loadPage() {
    this.numPage = Math.ceil(this.totalItem/this.itemInPage);
    let array: number[] = [];
    for (let i = 1; i <= this.numPage; i++){
      array.push(i);
    }
   return  array
  }
  pageClick(num:number) {
    this.pageNow = num;
  }

  orderStatus(order?:Order) {  
    this.isDetails = !this.isDetails;
    if(order != null) {
      this.orderDetails = order
    }
  
  }
}
