import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteNavbarComponent } from 'src/shared/components/site-navbar/site-navbar.component';
import { HomeComponent } from './home/home.component';
import { ManagementSidebarComponent } from './admin/shared/management-sidebar/management-sidebar.component';
import { ManagementHomeComponent } from './admin/general-management/management-home/management-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListHotelComponent } from './admin/hotel-management/list-hotel/list-hotel.component';
import { AddHotelComponent } from './admin/hotel-management/add-hotel/add-hotel.component';
import { EditHotelComponent } from './admin/hotel-management/edit-hotel/edit-hotel.component';
import { TourListComponent } from './admin/tour-management/tour-list/tour-list.component';
import { AddTourComponent } from './admin/tour-management/add-tour/add-tour.component';
import { EditTourComponent } from './admin/tour-management/edit-tour/edit-tour.component';
import { ManagementNavbarComponent } from './admin/shared/management-navbar/management-navbar.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TourTimeListComponent } from './tags/tourTime/tour-time-list/tour-time-list.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { VehicleComponent } from './tags/vehicle/vehicle.component';
import { TourTypeComponent } from './tags/tourType/tour-type/tour-type.component';
import { TourPolicyComponent } from './tags/policy/tour-policy/tour-policy.component'


@NgModule({
  declarations: [
    AppComponent,
    SiteNavbarComponent,
    HomeComponent,
    ManagementSidebarComponent,
    ManagementHomeComponent,
    ListHotelComponent,
    AddHotelComponent,
    EditHotelComponent,
    TourListComponent,
    AddTourComponent,
    EditTourComponent,
    ManagementNavbarComponent,
    TourTimeListComponent,
    VehicleComponent,
    TourTypeComponent,
    TourPolicyComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule, 
    CKEditorModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
