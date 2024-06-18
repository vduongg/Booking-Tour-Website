import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { UserInfoForm } from 'src/app/models/UserInfoForm';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {


  faUser = faUserCircle
  constructor() { }

  ngOnInit(): void {
  }

}
