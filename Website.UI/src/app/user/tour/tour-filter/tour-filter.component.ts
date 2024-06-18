import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { FilterForm } from 'src/app/models/FilterForm';
import { Tour } from 'src/app/models/Tour';
import { FilterTourService } from 'src/services/filter-tour.service';
import { ImageService } from 'src/services/image.service';
import { TourService } from 'src/services/tour.service';

@Component({
  selector: 'app-tour-filter',
  templateUrl: './tour-filter.component.html',
  styleUrls: ['./tour-filter.component.css']
})
export class TourFilterComponent implements OnChanges {
  @Input() tourName = ""
  @Input() tourLocation = "";
  @Input() tourRate = 0;
  @Input() tourPrice = "";
  @Input() tourDate = "";
  @Input() listType:number[] = []
  tourList: Tour[] = [];
  tourListOld: Tour[] = [];
  tourLowPrice: Tour[] = [];
  tourHighPrice: Tour[] = [];
  chooseSort = "";
  itemInPage = 5;
  page = 1;
  maxPage = 1;
  array = [1,2,3,4,5]
  isLoad = true;
  isNull = false;
  filterForm:FilterForm = new FilterForm();
  listChecked:boolean[] = []
  listFirstImg = new Map<number,string>()
  constructor(private filterTour:FilterTourService, private imageService:ImageService) { }

  ngOnChanges(change: SimpleChanges): void {
    this.isNull = false;
    this.filterForm.name = this.tourName;
    this.filterForm.place = this.tourLocation;
    this.filterForm.type = [...this.listType];
    this.filterForm.price = this.tourPrice
    console.log(this.filterForm.price)
    if(this.tourDate != ""){
      this.filterForm.departureDate = ( Number(this.tourDate.split("-")[1]) < 10? (this.tourDate.split("-")[1])[1]:this.tourDate.split("-")[1] ) 
    + "/" + (Number(this.tourDate.split("-")[2]) < 10 ? this.tourDate.split("-")[2][1]:this.tourDate.split("-")[2]) 
    + "/" + this.tourDate.split("-")[0];
    }
      this.filterTour.getFilter(this.filterForm).subscribe( (result: Tour[]) => 
        {
          this.tourListOld = result.reverse()
           this.tourList = result
            this.maxPage = Math.ceil(result.length / 5)
            this.page = 1, this.isLoad = false
            if(result.length < 1) {
              this.isNull = true;
            }
        })
      this.imageService.getFirstTourImage().subscribe((result: any) => {
        for(let i = 0 ; i < result.length ; i++) {
            this.listFirstImg.set(result[i].tourId, result[i].url)
        }
      })  
  }
  sortTour(){
  if(this.chooseSort == "low") {
    this.tourLowPrice = [...this.tourListOld];
    for(let i = 0; i < this.tourLowPrice.length - 1  ; i++){
      let min = i;
      let temp: Tour;
      for(let j = i + 1; j < this.tourLowPrice.length; j ++) {
          if( this.tourLowPrice[j].tourPrice < this.tourLowPrice[min].tourPrice) {
                 min = j
          }
      } 
      if(min != i) {
        temp = this.tourLowPrice[i]
        this.tourLowPrice[i] = this.tourLowPrice[min]
        this.tourLowPrice[min] = temp
    }
     }
     this.tourList = [...this.tourLowPrice]
  }
  else if (this.chooseSort == "high") {
    this.tourHighPrice = [...this.tourListOld];
    for(let i = 0; i < this.tourHighPrice.length - 1  ; i++){
      let max = i;
      let temp: Tour;
      for(let j = i + 1; j < this.tourHighPrice.length; j ++) {
          if( this.tourHighPrice[j].tourPrice > this.tourHighPrice[max].tourPrice) {
            max = j
          }
      } 
      if(max != i) {
        temp = this.tourHighPrice[i]
        this.tourHighPrice[i] = this.tourHighPrice[max]
        this.tourHighPrice[max] = temp
       
    }
      
     }
     this.tourList = [...this.tourHighPrice]
  }
  else if (this.chooseSort == "") {
    this.tourList = [...this.tourListOld];
  }
 }
 pageItem() {
  let arr:number[] = []
    if( this.page * this.itemInPage < this.tourList.length) {
        for(let i = 0; i < (this.page * this.itemInPage) %  this.tourList.length  ; i++ ) {
            arr.push(i)
        }
    }
    else {
      for(let i = 0; i <  this.tourList.length ; i++ ) {
        arr.push(i)
    } 
    }
    return arr;
    
 }
 nextPage() {
    this.page += 1;
 }

}
