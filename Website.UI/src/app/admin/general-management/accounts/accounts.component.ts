import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEllipsisH, faEllipsisV, faToggleOff, faToggleOn, faXRay } from '@fortawesome/free-solid-svg-icons';
import { RegisterForm } from 'src/app/models/RegisterForm';
import { Tour } from 'src/app/models/Tour';
import { TourDate } from 'src/app/models/TourDate';
import { UserInfo } from 'src/app/models/UserInfo';
import { AuthService } from 'src/services/auth.service';
import { TourTimeService } from 'src/services/tour-time.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  @Output() userUpdate = new EventEmitter<RegisterForm[]>();

  popup_delete = false;
  registerForm: RegisterForm = new RegisterForm();
  totalItem = 0;
  listUser: UserInfo[] = []
  faAction = faEllipsisV
  popup = false;
  popup_edit = false;
  popup_undo = false;
  isAction = false;
  id = 0;
  itemInPage = 10;
  pageNow = 1;
  numPage = 1;
  faOn = faToggleOn
  faOff = faToggleOff

  constructor(private userServices: UserService, private authService:AuthService) {
    
   }

  ngOnInit(): void {
    this.userServices.getAllUser().subscribe((result: UserInfo[]) => (this.listUser = result , this.totalItem = result.length, console.log(result) ));

  }
  

  statusPopup(){
    this.popup = !this.popup
    
  
  }
  statusAction(id:number){
    this.isAction = !this.isAction
    this.id = id;
  }
  edit(){
    this.popup_edit = !this.popup_edit
  }
  action(id:number, index?:string){
    if(id== -1) {
      if(index == "delete") {
        this.popup_delete = !this.popup_delete
        this.authService.editStatusUser(this.id).subscribe( () => window.location.reload())
        
        
      }
      if(index == "undo") {
        this.popup_undo = !this.popup_undo
        this.authService.editStatusUser(this.id).subscribe( () => window.location.reload())
      }
     
    }
    else {
      if(index == "delete") {
        this.popup_delete = !this.popup_delete
      }
      if(index == "undo") {
        this.popup_undo = !this.popup_undo
      }
      
      this.id = id
    }
    
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
  createUser(form:RegisterForm){
    this.authService.createUser(form).subscribe()
  }
 

}
