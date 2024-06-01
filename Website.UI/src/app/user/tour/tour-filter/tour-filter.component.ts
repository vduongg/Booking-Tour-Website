import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { FilterForm } from 'src/app/models/FilterForm';
import { Tour } from 'src/app/models/Tour';
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
  tourList: Tour[] = [];
  tourListOld: Tour[] = [];
  tourLowPrice: Tour[] = [];
  tourHighPrice: Tour[] = [];
  chooseSort = "";
  itemInPage = 5;
  page = 1;
  maxPage = 1;

 
  listFirstImg = new Map<number,string>()
  constructor(private tourService:TourService, private imageService:ImageService) { }

  ngOnChanges(change: SimpleChanges): void {
      this.tourService.getTour().subscribe( (result: Tour[]) => (this.tourListOld = result.reverse(), this.tourList = result, this.maxPage = Math.ceil(result.length / 5), this.page = 1))
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
