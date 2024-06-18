import { Component, OnInit } from '@angular/core';
import { faChartLine, faChevronCircleDown, faChevronDown, faChevronRight, faHome, faHotel, faShuttleVan, faTags, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

export type Item = {
    label: string;
    route: string;
}

export type MenuItem = {
  icon: any;
  label: string;
  route?: string;
  key: string;
  item?: Item[]
}

@Component({
  selector: 'app-management-sidebar',
  templateUrl: './management-sidebar.component.html',
  styleUrls: ['./management-sidebar.component.css']
})
export class ManagementSidebarComponent implements OnInit {
  faUser = faUserCircle
  faRight = faChevronRight;
  faDown = faChevronDown;
  key = "";
  fullName = "";
  role = "";
  menuItem: MenuItem[] = []
  constructor(private userService:UserService, private authService:AuthService) { }

  ngOnInit(): void {
    this.userService.getFullNameFromStore().subscribe(
      result => {
        const fullnameFromToken = this.authService.getFullNameFromToken();
        this.fullName = result || fullnameFromToken
      })
      this.userService.getRoleFromStore().subscribe( result => {
        const getRoleFromToken = this.authService.getRoleFromToken();
        this.role = result || getRoleFromToken;
        if(this.role == "Admin"){
          this.menuItem = [
            {
              icon: faTags,
              label: "Thẻ",
              route: "/admin/tags",
              key: "tags",
              item: [
                {
                  label: "Loại du lịch",
                  route: "/admin/tags/tourtype"
              },
              {
                label: "Thời gian Tour",
                route: "/admin/tags/tourtime"
              },
              {
                label: "Chính sách",
                route: "/admin/tags/tourpolicy"
              }
              
            ],
            },
            {
              icon: faShuttleVan,
              label: "Tour",
              route: "/admin/tour",
              key: "tour",
              item: [
                {
                  label: "Danh sách Tour",
                  route: "/admin/tour",
                },
                {
                label: "Thêm Tour mới",
                route: "/admin/tour/add",
              },
              {
                label: "Danh sách đơn",
                route: "/admin/tour/order",
              }
            ],
            }
            ,
            {
              icon: faChartLine,
              label: "Thống kê",
              key: "chart",
              route: "/admin/statistic"
            },
            {
              icon: faUser ,
              label: "Người dùng",
              key: "user",
              route: "/admin/accounts",
              item: [
                {
                  label: "Danh sách người dùng",
                  route: "/admin/accounts"
                }
              ],
            }
          ]

        }
        else if( this.role == "Tour Manager"){
            this.menuItem = [ {
              icon: faTags,
              label: "Thẻ",
              route: "/admin/tags",
              key: "tags",
              item: [
                {
                  label: "Loại du lịch",
                  route: "/admin/tags/tourtype"
              },
              {
                label: "Thời gian Tour",
                route: "/admin/tags/tourtime"
              },
              {
                label: "Chính sách",
                route: "/admin/tags/tourpolicy"
              }
              
            ],
            },
            {
              icon: faShuttleVan,
              label: "Tour",
              route: "/admin/tour",
              key: "tour",
              item: [
                {
                  label: "Danh sách Tour",
                  route: "/admin/tour",
                },
                {
                label: "Thêm Tour mới",
                route: "/admin/tour/add",
              },
              {
                label: "Danh sách đơn",
                route: "/admin/tour/order",
              }
            ],
            }]
        }
      })
  }
 
  logout(){
    this.authService.logOut();
  }


}
