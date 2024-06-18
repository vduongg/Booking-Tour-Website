import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Tour } from 'src/app/models/Tour';
import { TourImage } from 'src/app/models/TourImage';
import { UserInfoForm } from 'src/app/models/UserInfoForm';
import { ImageService } from 'src/services/image.service';
import { OrderService } from 'src/services/order.service';
import { TourDetailsService } from 'src/services/tour-details.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  constructor(private orderService:OrderService, private userService:UserService, private tourService:TourDetailsService, private imageService:ImageService) { }
  email= "";
  itemInPage = 10;
  pageNow = 1;
  numPage = 1;
  totalItem = 0;
  listOrder:Order[] = []
  isDetails = false
  userForm: UserInfoForm = new UserInfoForm;
  orderDetails: Order = new Order();
  tourImageList:string[] = [];
  tourDetails: Tour = new Tour();
  ngOnInit(): void {
  
    this.email = this.userService.decodedToken().email;
    this.userService.getUserInfo(this.email).subscribe(
      result => {
        this.userForm = result
        this.orderService.getOrderUser(Number(this.userForm.userId)).subscribe((result:Order[]) =>{
          this.listOrder = result
          this.totalItem = this.listOrder.length
        })
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
  orderDetail(order:Order){
    this.tourService.getTourDetails(order.tourId).subscribe( (result:Tour) =>{
      this.tourDetails = result;
      this.imageService.getTourImage(result.tourId).subscribe((result:TourImage[])=>{
          result.forEach( r => {
            this.tourImageList.push(r.imageURL)
          });
      })
      this.orderDetails = order
      this.isDetails = true;
  })
  }
  back(){
    this.isDetails = false;
  }

}
