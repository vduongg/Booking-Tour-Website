import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
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
import { CallbackComponent } from './user/payment/callback/callback.component';
import { TourOrderComponent } from './admin/tour-management/tour-order/tour-order.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthenUserGuard } from './guards/authen-user.guard';
import { UserLoginGuard } from './guards/user-login.guard';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { PurchaseHistoryComponent } from './user/purchase-history/purchase-history.component';
import { TourStatisticComponent } from './admin/general-management/tour-statistic/tour-statistic.component';




const routes: Routes = [
  {
     component:HomeComponent,
     path: "",
  },
  {
    component:TourListComponent,
    path: "admin/tour",
    canActivate:[AuthenGuard],
  }
  ,{
    component:AddTourComponent,
    path: "admin/tour/add",
    canActivate:[AuthenGuard],
  }
  ,{
    component:EditTourComponent,
    path: "admin/tour/edit/:id",
    canActivate:[AuthenGuard],
  
  },
  {
    component:TourTimeListComponent,
    path: "admin/tags/tourtime",
    canActivate:[AuthenGuard],

  },
  {
    component:TourPolicyComponent,
    path: "admin/tags/tourpolicy",
    canActivate:[AuthenGuard],
  
  },
  {
    component:TourTypeComponent,
    path: "admin/tags/tourtype",
    canActivate:[AuthenGuard],

  },
  {
    component:LoginAdminComponent,
    path: "admin/login"
  },
  {
    component:AccountsComponent,
    path: "admin/accounts",
    canActivate:[AuthenGuard],
  },
  {
    component:RegisterComponent,
    path: "register",
    canActivate:[UserLoginGuard]
    
  },
  {
    component:LoginComponent,
    path: "login",
    canActivate:[UserLoginGuard]
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
    path: "payments",
    canActivate:[AuthenUserGuard],
  },
  {
    component:CallbackComponent,
    path: "payments/callback"
  },
  {
    component:TourOrderComponent,
    path: "admin/tour/order",
    canActivate:[AuthenGuard],
  },
  {
    component:UserInfoComponent,
    path: "user/info"
  },
  {
    component:PurchaseHistoryComponent,
    path: "user/history"
  },
  {
    component:TourStatisticComponent,
    path: "admin/statistic"
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
