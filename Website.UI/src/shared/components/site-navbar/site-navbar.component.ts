import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-site-navbar',
  templateUrl: './site-navbar.component.html',
  styleUrls: ['./site-navbar.component.css']
})
export class SiteNavbarComponent implements OnInit {

  fullName = ""
  role = ""
  faUser = faUserCircle
  popupUSer = false;
  constructor(private userService:UserService, private authService:AuthService) { }

  ngOnInit(): void {
    
    this.userService.getFullNameFromStore().subscribe(
      result => {
        const fullnameFromToken = this.userService.getFullNameFromToken();
        if( fullnameFromToken != null ) {
          this.fullName = result || fullnameFromToken
        }
      
      })
      this.userService.getRoleFromStore().subscribe( result => {
        const getRoleFromToken = this.userService.getRoleFromToken();
        this.role = result || getRoleFromToken;
      })
  
  }
  logout(){
    this.userService.logOut();
  }
  

}
