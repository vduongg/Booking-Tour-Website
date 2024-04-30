import { Component, OnInit } from '@angular/core';
import { faChartLine, faChevronRight, faHome, faHotel, faShuttleVan, faTags, faUser } from '@fortawesome/free-solid-svg-icons';

export type MenuItem = {
  icon: any;
  label: string;
  route: string;
}

@Component({
  selector: 'app-management-sidebar',
  templateUrl: './management-sidebar.component.html',
  styleUrls: ['./management-sidebar.component.css']
})
export class ManagementSidebarComponent implements OnInit {
  fachevron = faChevronRight

  
  constructor() { }

  ngOnInit(): void {
  }
  menuItem = [
    {
      icon: faHome,
      label: "Bảng điều khiển",
      route: "/admin/home"
    },
    {
      icon: faTags,
      label: "Thẻ",
      route: "/admin/tags"
    },
    {
      icon: faShuttleVan,
      label: "Tour",
      route: "/admin/tour"
    }
    ,
    {
      icon: faHotel,
      label: "Khách sạn",
      route: "/admin/hotel"
    },
    {
      icon: faChartLine,
      label: "Thống kê",
    },
    {
      icon: faUser ,
      label: "Người dùng"
    }
  ]

}
