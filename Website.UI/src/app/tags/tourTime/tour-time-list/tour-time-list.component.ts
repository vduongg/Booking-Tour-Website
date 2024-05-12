import { Component, OnInit } from '@angular/core';
import { faEllipsisH, faEllipsisV, faXRay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tour-time-list',
  templateUrl: './tour-time-list.component.html',
  styleUrls: ['./tour-time-list.component.css']
})
export class TourTimeListComponent implements OnInit {
  faAction = faEllipsisV
  popup = false;
  isAction = false;

  constructor() { }

  ngOnInit(): void {
  }
  statusPopup(){
    this.popup = !this.popup
  }
  statusAction(){
    this.isAction = !this.isAction
  }

}
