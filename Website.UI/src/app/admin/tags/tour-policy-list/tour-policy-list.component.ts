import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { TourPolicy } from 'src/app/models/TourPolicy';
import { PolicyService } from 'src/services/policy.service';

@Component({
  selector: 'app-tour-policy',
  templateUrl: './tour-policy-list.component.html',
  styleUrls: ['./tour-policy-list.component.css']
})
export class TourPolicyComponent implements OnInit {
  public Editor = Editor;

 
  popup = false;
  isAction = false;
  tourPolicy : TourPolicy[] = []
  formPolicy : TourPolicy = new TourPolicy();
  formUpdatePolicy : TourPolicy = new TourPolicy();
  id = 0;
  itemInPage = 10;
  pageNow = 1;
  numPage = 1;
  totalItem = 0;
  popupEdit = false;
  faAction = faEllipsisV

  @Output()  tourPolicyUpdate = new EventEmitter<TourPolicy[]>();

  constructor(private tourPolicyService: PolicyService ) { }

  ngOnInit(): void {
    this.tourPolicyService.getTourPolicy().subscribe((result: TourPolicy[]) => (this.tourPolicy = result , this.totalItem = result.length ));
  }
  statusPopup(){
    this.popup = !this.popup
    
  
  }
  statusAction(id:number){
    this.isAction = !this.isAction
    this.id = id
  }
  createTourPolicy(policy: TourPolicy){
    
    this.tourPolicyService.createTourPolicy(policy).subscribe( (policy: TourPolicy[]) => this.tourPolicyUpdate.emit(policy));
    window.location.reload();

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
  edit(policy?:TourPolicy) {
    this.popupEdit = !this.popupEdit
    if(policy != null){
      this.formUpdatePolicy = policy;
    }
  }
  updateTourPolicy(policy:TourPolicy) {
    this.tourPolicyService.updateTourPolicy(policy).subscribe(() =>  window.location.reload());
   
  }
}
