import { Component, OnInit } from '@angular/core';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-management-navbar',
  templateUrl: './management-navbar.component.html',
  styleUrls: ['./management-navbar.component.css']
})
export class ManagementNavbarComponent implements OnInit {
  fabar = faBars;
  fabell = faBell;

  constructor() { }

  ngOnInit(): void {
  }
  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    sidebar.classList.toggle('hide');
    const navbar = document.querySelector('.management-navbar') as HTMLElement;
    navbar.classList.toggle('hide');
    const addTour = document.querySelector('.add-tour') as HTMLElement;
    addTour.classList.toggle('hide');
}
}
