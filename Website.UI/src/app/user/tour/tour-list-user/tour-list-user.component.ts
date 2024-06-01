import { Component, Input, OnInit } from '@angular/core';
import { faCalendar, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FilterForm } from 'src/app/models/FilterForm';

@Component({
  selector: 'app-tour-list-user',
  templateUrl: './tour-list-user.component.html',
  styleUrls: ['./tour-list-user.component.css']
})
export class TourListUserComponent implements OnInit {


  filterForm: FilterForm =  new  FilterForm();
  faCalender = faCalendar;
  rate: number[] = [];
  isRate5 = false;
  isRate4 = false;
  isRate3 = false;
  isChange1 = false;
  isChange2 = false;
  isChange3 = false;
  price:string = ""

  constructor() { }

  ngOnInit(): void {
  }

  
  rateChange(r:number , b: boolean) {
    if( b == true ) {
      this.rate.push(r)
    }
    else {
      this.rate = this.rate.filter(item => item != r)
    }
    if(this.rate.length != 0) {
      this.filterForm.tourRate = Math.min(...this.rate);
    }
    else{
      this.filterForm.tourRate = 0;
    }
   
  }
  locationChange(e:string) {
    this.filterForm.tourPlace = e;
  }
  dateChange(e:string) {
    this.filterForm.tourDate = e;
  }
  priceChange(i:number, b:boolean){
    if( b == true ) {
      this.filterForm.tourPrice.push(i)
    }
    else {
      this.filterForm.tourPrice = this.filterForm.tourPrice.filter(item => item != i)
    }
    if((this.filterForm.tourPrice.includes(1) && this.filterForm.tourPrice.includes(2) && this.filterForm.tourPrice.includes(3) )  ) {
      this.price = "all"
    }
    else if (!this.filterForm.tourPrice.includes(1) && !this.filterForm.tourPrice.includes(2) && !this.filterForm.tourPrice.includes(3))
      {
        this.price = "all"
      }
    else if(this.filterForm.tourPrice.includes(1) && !this.filterForm.tourPrice.includes(2) && !this.filterForm.tourPrice.includes(3)) {
      this.price = "lower5"
    }
    else if(!this.filterForm.tourPrice.includes(1) && this.filterForm.tourPrice.includes(2) && !this.filterForm.tourPrice.includes(3)) {
      this.price = "between5and10"
    }
    else if(!this.filterForm.tourPrice.includes(1) && !this.filterForm.tourPrice.includes(2) && this.filterForm.tourPrice.includes(3)) {
      this.price = "higher10"
    }
    else if(this.filterForm.tourPrice.includes(1) && this.filterForm.tourPrice.includes(2) && !this.filterForm.tourPrice.includes(3)) {
      this.price = "lower10"
    }
    else if(!this.filterForm.tourPrice.includes(1) && this.filterForm.tourPrice.includes(2) && this.filterForm.tourPrice.includes(3)) {
      this.price = "higher5"
    }
    else if(this.filterForm.tourPrice.includes(1) && !this.filterForm.tourPrice.includes(2) && this.filterForm.tourPrice.includes(3)) {
      this.price = "lower5 and higer10"
    }
   
   
  
  }
  nameChange(name:string ){
    this.filterForm.tourName = name;
  }
  search(){
    
  }

}
