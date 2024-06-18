import { Component, Input, OnInit } from '@angular/core';
import { faCalendar, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FilterForm } from 'src/app/models/FilterForm';
import { ListLocation } from 'src/app/models/ListLocation';
import { TourType } from 'src/app/models/TourType';
import { LocationService } from 'src/services/location.service';
import { TourTypeService } from 'src/services/tour-type.service';

@Component({
  selector: 'app-tour-list-user',
  templateUrl: './tour-list-user.component.html',
  styleUrls: ['./tour-list-user.component.css']
})
export class TourListUserComponent implements OnInit {


  filterForm: FilterForm =  new  FilterForm();
  faCalender = faCalendar;
  rate: number[] = [];
  tourType: TourType[] = [];
  listType: number[] = []
  listTypeChange:number [] = []
  isRate5 = false;
  isRate4 = false;
  isRate3 = false;
  isChange1 = false;
  isChange2 = false;
  isChange3 = false;
  tourPrice: number[] = []
  location: ListLocation = new ListLocation;
  price:string = ""
  listChecked:boolean[] = []
  constructor(private LocationService:LocationService, private tourTypeService: TourTypeService) { }

  ngOnInit(): void {
    this.tourTypeService.getTourType().subscribe((result: TourType[]) => {
      this.tourType = result
      for(let i = 0; i< result.length ; i++){
        this.listChecked.push(false);
      }
    });
    this.LocationService.getListLocation().subscribe((result: ListLocation)=> (this.location = result));
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
    this.filterForm.place = e;
  }
  dateChange(e:string) {
    this.filterForm.departureDate = e;
  }
  priceChange(i:number, b:boolean){
   
    if( b == true ) {
      this.tourPrice.push(i)
    }
    else {
      this.tourPrice = this.tourPrice.filter(item => item != i)
    }
    if((this.tourPrice.includes(1) && this.tourPrice.includes(2) && this.tourPrice.includes(3) )  ) {
      this.price = "all"
    }
    else if (!this.tourPrice.includes(1) && !this.tourPrice.includes(2) && !this.tourPrice.includes(3))
      {
        this.price = "all"
      }
    else if(this.tourPrice.includes(1) && !this.tourPrice.includes(2) && !this.tourPrice.includes(3)) {
      this.price = "lower5"
    }
    else if(!this.tourPrice.includes(1) && this.tourPrice.includes(2) && !this.tourPrice.includes(3)) {
      this.price = "between5and10"
    }
    else if(!this.tourPrice.includes(1) && !this.tourPrice.includes(2) && this.tourPrice.includes(3)) {
      this.price = "higher10"
    }
    else if(this.tourPrice.includes(1) && this.tourPrice.includes(2) && !this.tourPrice.includes(3)) {
      this.price = "lower10"
    }
    else if(!this.tourPrice.includes(1) && this.tourPrice.includes(2) && this.tourPrice.includes(3)) {
      this.price = "higher5"
    }
    else if(this.tourPrice.includes(1) && !this.tourPrice.includes(2) && this.tourPrice.includes(3)) {
      this.price = "lower5 and higer10"
    }
   
   
  
  }
  nameChange(name:string ){
    this.filterForm.name = name;
  }
  selectType(bool:boolean, type:number , index:number){
    if(bool == false) {
      this.listChecked[index] = true;
      this.listType.push(type)
      this.listTypeChange = [...this.listType]
    }
    else {
      this.listChecked[index] = false;
      var typeTemp = this.listType.indexOf(type);
      this.listType.splice(typeTemp,1)
      this.listTypeChange = [...this.listType]
    }
  }
  

}
