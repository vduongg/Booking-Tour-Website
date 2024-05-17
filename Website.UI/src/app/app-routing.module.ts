import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManagementHomeComponent } from './admin/general-management/management-home/management-home.component';
import { ListHotelComponent } from './admin/hotel-management/list-hotel/list-hotel.component';
import { TourListComponent } from './admin/tour-management/tour-list/tour-list.component';
import { AddTourComponent } from './admin/tour-management/add-tour/add-tour.component';
import { TourTimeListComponent } from './tags/tourTime/tour-time-list/tour-time-list.component';
import { TourPolicyComponent } from './tags/policy/tour-policy/tour-policy.component';
import { VehicleComponent } from './tags/vehicle/vehicle.component';
import { TourTypeComponent } from './tags/tourType/tour-type/tour-type.component';

const routes: Routes = [
  {
     component:HomeComponent,
     path: "",
  },
  {
    component:ManagementHomeComponent,
    path: "admin/home",
  },
  {
    component:ListHotelComponent,
    path: "admin/hotel"
  },
  {
    component:TourListComponent,
    path: "admin/tour"
  }
  ,{
    component:AddTourComponent,
    path: "admin/tour/add"
  },
  {
    component:TourTimeListComponent,
    path: "admin/tags/tourtime"
  },
  {
    component:TourPolicyComponent,
    path: "admin/tags/tourpolicy"
  },
  {
    component:VehicleComponent,
    path: "admin/tags/vehicle"
  },
  {
    component:TourTypeComponent,
    path: "admin/tags/tourtype"
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
