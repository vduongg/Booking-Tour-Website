import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management-home',
  templateUrl: './management-home.component.html',
  styleUrls: ['./management-home.component.css']
})
export class ManagementHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  listitem = [
  {
    name: "Tổng số Tour",
    content: 16,
  },
  {
    name: "Tổng số đặt Tour",
    content: 16,
  },
  {
    name: "Tổng số đặt Tour",
    content: 16,
  },
  {
    name: "Tổng số đặt Tour",
    content: 16,
  }
  ]
}
