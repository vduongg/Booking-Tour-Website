import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteNavbarComponent } from 'src/shared/components/site-navbar/site-navbar.component';
import { HomeComponent } from './user/home/home.component';
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
import { RegisterComponent } from './auth/user/register/register.component';
import { LoginComponent } from './auth/user/login/login.component';
import { TourDetailsComponent } from './user/tour/tour-details/tour-details.component';
import { TourFilterComponent } from './user/tour/tour-filter/tour-filter.component';
import { TourListUserComponent } from './user/tour/tour-list-user/tour-list-user.component';
import { PaymentsComponent } from './user/payment/payments/payments.component';
import { CallbackComponent } from './user/payment/callback/callback.component';
import { TourOrderComponent } from './admin/tour-management/tour-order/tour-order.component';
import { TourOrderDetailsComponent } from './admin/tour-management/tour-order-details/tour-order-details.component';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { NavbarUserComponent } from 'src/shared/navbar-user/navbar-user.component';
import { PurchaseHistoryComponent } from './user/purchase-history/purchase-history.component';
import { TourStatisticComponent } from './admin/general-management/tour-statistic/tour-statistic.component';
import { ManagementSidebarComponent } from './admin/shared/management-sidebar/management-sidebar.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    SiteNavbarComponent,
    HomeComponent,
    TourListComponent,
    AddTourComponent,
    EditTourComponent,
    ManagementNavbarComponent,
    TourTimeListComponent,
    TourTypeComponent,
    LoginAdminComponent,
    AccountsComponent,
    TourPolicyComponent,
    AccountsComponent,
    RegisterComponent,
    LoginComponent,
    TourDetailsComponent,
    TourFilterComponent,
    TourListUserComponent,
    PaymentsComponent,
    CallbackComponent,
    TourOrderComponent,
    TourOrderDetailsComponent,
    UserInfoComponent,
    PurchaseHistoryComponent,
    NavbarUserComponent,
    TourStatisticComponent,
    ManagementSidebarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule, 
    CKEditorModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
