import { Component, OnInit } from '@angular/core';
import { faChartLine, faChevronCircleDown, faChevronDown, faChevronRight, faHome, faHotel, faShuttleVan, faTags, faUser } from '@fortawesome/free-solid-svg-icons';

export type Item = {
    label: string;
    route: string;
}

export type MenuItem = {
  icon: any;
  label: string;
  route: string;
  key: string
  item: Item[]
}

@Component({
  selector: 'app-management-sidebar',
  templateUrl: './management-sidebar.component.html',
  styleUrls: ['./management-sidebar.component.css']
})
export class ManagementSidebarComponent implements OnInit {
  faRight = faChevronRight;
  faDown = faChevronDown;
  key = "";
  constructor() { }

  ngOnInit(): void {
    
  }
  menuItem = [
    {
      icon: faHome,
      label: "Bảng điều khiển",
      route: "/admin/home",
      key: "dashboard",
    },
    {
      icon: faTags,
      label: "Thẻ",
      route: "/admin/tags",
      key: "tags",
      item: [
        {
          label: "Loại du lịch",
          route: "/"
      },
      {
        label: "Thời gian Tour",
        route: "/admin/tags/tourtime"
      },
      {
        label: "Phương tiện",
        route: "/"
      },
      {
        label: "Quy định",
        route: "/"
      }
    ]
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
      }]
    }
    ,
    {
      icon: faHotel,
      label: "Khách sạn",
      route: "/admin/hotel",
      key: "hotel",
      item: [
        {
        label: "Danh sách Khách sạn",
        route: "/"
      },
      {
        label: "Thêm Khách sạn",
        route: "/"
      }
    ]

    },
    {
      icon: faChartLine,
      label: "Thống kê",
      key: "chart",
    },
    {
      icon: faUser ,
      label: "Người dùng",
      key: "user",
    }
  ]
 



}
