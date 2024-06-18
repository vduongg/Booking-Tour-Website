import { Component, OnInit } from '@angular/core';
import { faBars, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-management-navbar',
  templateUrl: './management-navbar.component.html',
  styleUrls: ['./management-navbar.component.css']
})
export class ManagementNavbarComponent implements OnInit {
  fabar = faBars;
  fabell = faBell;
  faUser = faUserCircle
  fullName = "";
  isLogout = false;
  constructor(private userService:UserService, private authService:AuthService) { }

  ngOnInit(): void {
    this.userService.getFullNameFromStore().subscribe(
      result => {
        const fullnameFromToken = this.authService.getFullNameFromToken();
        this.fullName = result || fullnameFromToken
      })
  }
  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    sidebar.classList.toggle('hide');
    const navbar = document.querySelector('.management-navbar') as HTMLElement;
    navbar.classList.toggle('hide');
    const addTour = document.querySelector('.add-tour') as HTMLElement;
    addTour.classList.toggle('hide');
}
logout(){
  this.authService.logOut();
}
}
