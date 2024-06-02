import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { ManagementHomeComponent } from './admin/general-management/management-home/management-home.component';
import { TourListComponent } from './admin/tour-management/tour-list/tour-list.component';
import { AddTourComponent } from './admin/tour-management/add-tour/add-tour.component';
import { TourTimeListComponent } from './admin/tags/tour-time-list/tour-time-list.component';
import { TourTypeComponent } from './admin/tags/tour-type-list/tour-type.component';
import { EditTourComponent } from './admin/tour-management/edit-tour/edit-tour.component';
import { LoginAdminComponent } from './auth/admin/login-admin/login-admin.component';
import { AuthenGuard } from './guards/authen.guard';
import { TourPolicyComponent } from './admin/tags/tour-policy-list/tour-policy-list.component';
import { AccountsComponent } from './admin/general-management/accounts/accounts.component';
import { RegisterComponent } from './auth/user/register/register.component';
import { LoginComponent } from './auth/user/login/login.component';
import { TourListUserComponent } from './user/tour/tour-list-user/tour-list-user.component';
import { TourDetailsComponent } from './user/tour/tour-details/tour-details.component';
import { PaymentsComponent } from './user/payment/payments/payments.component';


const routes: Routes = [
  {
     component:HomeComponent,
     path: "",
  },
  {
    component:ManagementHomeComponent,
    path: "admin/home",
    canActivate:[AuthenGuard]
  },
  {
    component:TourListComponent,
    path: "admin/tour"
  }
  ,{
    component:AddTourComponent,
    path: "admin/tour/add"
  }
  ,{
    component:EditTourComponent,
    path: "admin/tour/edit/:id"
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
    component:TourTypeComponent,
    path: "admin/tags/tourtype"
  },
  {
    component:LoginAdminComponent,
    path: "admin/login"
  },
  {
    component:AccountsComponent,
    path: "admin/accounts"
  },
  {
    component:RegisterComponent,
    path: "register"
  },
  {
    component:LoginComponent,
    path: "login"
  },
  {
    component:TourListUserComponent,
    path: "tour"
  },
  {
    component:TourDetailsComponent,
    path:  "tour/:id"
  },
  {
    component:PaymentsComponent,
    path: "payments"
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
