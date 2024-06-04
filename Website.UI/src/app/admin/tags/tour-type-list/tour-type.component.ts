import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { TourType } from 'src/app/models/TourType';
import { TourTypeService } from 'src/services/tour-type.service';

@Component({
  selector: 'app-tour-type',
  templateUrl: './tour-type.component.html',
  styleUrls: ['./tour-type.component.css']
})
export class TourTypeComponent implements OnInit {
  popupEdit = false;
  popup = false;
  isAction = false;
  tourType : TourType[] = []
  formTourType : TourType = new TourType();
  formUpdateTourType : TourType = new TourType();
  id = 0;
  itemInPage = 10;
  pageNow = 1;
  numPage = 1;
  totalItem = 0;
  faAction = faEllipsisV

  @Output()  tourTypeUpdate = new EventEmitter<TourType[]>();

  constructor(private tourTypeService: TourTypeService ) { }

  ngOnInit(): void {
    this.tourTypeService.getTourType().subscribe((result: TourType[]) => (this.tourType = result , this.totalItem = result.length ));
  }
  statusPopup(){
    this.popup = !this.popup
    
  
  }
  statusAction(id:number){
    this.isAction = !this.isAction
    this.id = id
  }
  createTourTime(type: TourType){
    this.tourTypeService.createTourType(type).subscribe( (type: TourType[]) => (this.tourTypeUpdate.emit(type),    window.location.reload()));


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
  loadPage() {
    this.numPage = Math.ceil(this.totalItem/this.itemInPage);
    let array: number[] = [];
    for (let i = 1; i <= this.numPage; i++){
      array.push(i);
    }
    
   return  array
  }
  updateTourTime(type:TourType){
    this.tourTypeService.updateTourType(type).subscribe(() =>  window.location.reload());
  }
  edit(type?:TourType){
    this.popupEdit = !this.popupEdit
    if(type != null) {
      this.formUpdateTourType = type
    }
  }
}
