import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faEllipsisV, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { Tour } from 'src/app/models/Tour';
import { AuthService } from 'src/services/auth.service';
import { ImageService } from 'src/services/image.service';
import { TourService } from 'src/services/tour.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {

  popup_delete = false;
  popup_undo = false;
  popup = false;
  isAction = false;
  listTour : Tour[] = []
  formTour : Tour = new Tour();
  id = 0;
  itemInPage = 10;
  pageNow = 1;
  numPage = 1;
  totalItem = 0;
  faAction = faEllipsisV
  faOn = faToggleOn
  faOff = faToggleOff
  tourItem: Tour[] = []
  email = ""
  userid = "";
  role = "";
  listFirstImg = new Map<number,string>()
  @Output()  tourUpdate = new EventEmitter<Tour[]>();

  constructor(private tourService: TourService, private imageService: ImageService,  private userService:UserService, private authService:AuthService) { }

  ngOnInit(): void {
    this.userService.getRoleFromStore().subscribe( result => {
      const getRoleFromToken = this.authService.getRoleFromToken();
      this.role = result || getRoleFromToken;
    })
    this.email = this.authService.decodedToken().email;
    this.userService.getUserInfo(this.email).subscribe(
     result => 
       {
         this.userid = result.userId
       }
     
    )
    this.tourService.getTour().subscribe((result: Tour[]) => (this.listTour = result , this.totalItem = result.length));
    this.imageService.getFirstTourImage().subscribe((result: any) => {
      for(let i = 0 ; i < result.length ; i++) {
          this.listFirstImg.set(result[i].tourId, result[i].url)
      }
    })
  } 

  statusAction(id:number){
    this.isAction = !this.isAction
    this.id = id

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
  action(id:number, index?:string){
    if(id== -1) {
      if(index == "delete") {
        this.popup_delete = !this.popup_delete
        console.log(this.id)
        this.tourService.updateStatusTour(this.id).subscribe( () => window.location.reload())
        
      }
      if(index == "undo") {
        this.popup_undo = !this.popup_undo
     
        this.tourService.updateStatusTour(this.id).subscribe( () => window.location.reload())
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
  
 
  
  
}
