import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteNavbarComponent } from 'src/shared/components/site-navbar/site-navbar.component';
import { HomeComponent } from './user/home/home.component';
import { ManagementSidebarComponent } from './admin/shared/management-sidebar/management-sidebar.component';
import { ManagementHomeComponent } from './admin/general-management/management-home/management-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TourListComponent } from './admin/tour-management/tour-list/tour-list.component';
import { AddTourComponent } from './admin/tour-management/add-tour/add-tour.component';
import { EditTourComponent } from './admin/tour-management/edit-tour/edit-tour.component';
import { ManagementNavbarComponent } from './admin/shared/management-navbar/management-navbar.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TourTimeListComponent } from './admin/tags/tour-time-list/tour-time-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TourTypeComponent } from './admin/tags/tour-type-list/tour-type.component';
import { LoginAdminComponent } from './auth/admin/login-admin/login-admin.component'
import { TokenInterceptor } from './interceptor/token.interceptor';
import { AccountsComponent } from './admin/general-management/accounts/accounts.component';
import { TourPolicyComponent } from './admin/tags/tour-policy-list/tour-policy-list.component';


@NgModule({
  declarations: [
    AppComponent,
    SiteNavbarComponent,
    HomeComponent,
    ManagementSidebarComponent,
    ManagementHomeComponent,
    TourListComponent,
    AddTourComponent,
    EditTourComponent,
    ManagementNavbarComponent,
    TourTimeListComponent,
    TourTypeComponent,
    LoginAdminComponent,
    AccountsComponent,
    TourPolicyComponent,
    AccountsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule, 
    CKEditorModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
