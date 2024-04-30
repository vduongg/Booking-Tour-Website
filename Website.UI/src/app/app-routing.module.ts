import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManagementHomeComponent } from './admin/general-management/management-home/management-home.component';
import { ListHotelComponent } from './admin/hotel-management/list-hotel/list-hotel.component';
import { TourListComponent } from './admin/tour-management/tour-list/tour-list.component';
import { AddTourComponent } from './admin/tour-management/add-tour/add-tour.component';

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
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
