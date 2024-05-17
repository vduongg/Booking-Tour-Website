import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Vehicle } from 'src/app/models/Vehicle';
import { VehicleService } from 'src/services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  popup = false;
  isAction = false;
  tourVehicle : Vehicle[] = []
  formTourType : Vehicle = new Vehicle();
  id = 0;
  itemInPage = 10;
  pageNow = 1;
  numPage = 1;
  totalItem = 0;
  faAction = faEllipsisV

  @Output()  vehicleUpdate = new EventEmitter<Vehicle[]>();

  constructor(private vehicleService: VehicleService ) { }

  ngOnInit(): void {
  }
  statusPopup(){
    this.popup = !this.popup
    
  
  }
  statusAction(id:number){
    this.isAction = !this.isAction

  }
  createTourTime(vehicle: Vehicle){
    this.vehicleService.createVehicle(vehicle).subscribe( (vehicle: Vehicle[]) => this.vehicleUpdate.emit(vehicle));
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

}
