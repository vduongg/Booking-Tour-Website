import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Tour } from 'src/app/models/Tour';
import { TourType } from 'src/app/models/TourType';
import { TourService } from 'src/services/tour.service';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {

  popup = false;
  isAction = false;
  tour : Tour[] = []
  formTour : Tour = new Tour();
  id = 0;
  itemInPage = 10;
  pageNow = 1;
  numPage = 1;
  totalItem = 0;
  faAction = faEllipsisV

  @Output()  tourUpdate = new EventEmitter<Tour[]>();

  constructor(private tourService: TourService ) { }

  ngOnInit(): void {
    this.tourService.getTour().subscribe((result: Tour[]) => (this.tour = result , this.totalItem = result.length ));
  }

  statusAction(id:number){
    this.isAction = !this.isAction

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

}
