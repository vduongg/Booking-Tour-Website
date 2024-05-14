import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEllipsisH, faEllipsisV, faXRay } from '@fortawesome/free-solid-svg-icons';
import { ListLocation } from 'src/app/models/ListLocation';
import { Location } from 'src/app/models/Location';
import { TourDate } from 'src/app/models/TourDate';
import { LocationService } from 'src/services/location.service';
import { TourService } from 'src/services/tour.service';

@Component({
  selector: 'app-tour-time-list',
  templateUrl: './tour-time-list.component.html',
  styleUrls: ['./tour-time-list.component.css']
})
export class TourTimeListComponent implements OnInit {

  @Output() dateUpdate = new EventEmitter<TourDate[]>();

  totalItem = 0;

  faAction = faEllipsisV
  popup = false;
  isAction = false;
  tourDate: TourDate[] = [];
  id = 0;
  itemInPage = 10;
  pageNow = 1;
  numPage = 1;
  formDate: TourDate = new TourDate();

  constructor(private tourDateService: TourService) {
    
   }

  ngOnInit(): void {
    this.tourDateService.getTourDate().subscribe((result: TourDate[]) => (this.tourDate = result , this.totalItem = result.length ));

  }
  

  statusPopup(){
    this.popup = !this.popup
    
  
  }
  statusAction(id:number){
    this.isAction = !this.isAction
    this.id = id;
  }
  loadPage() {
    this.numPage = Math.ceil(this.totalItem/this.itemInPage);
    let array: number[] = [];
    for (let i = 1; i <= this.numPage; i++){
      array.push(i);
    }
    
   return  array
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
  pageClick(num:number) {
      this.pageNow = num;
  }
  createTourTime(date: TourDate){
    this.tourDateService.createTourDate(date).subscribe( (date: TourDate[]) => this.dateUpdate.emit(date));
    window.location.reload();

  }

}
