import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { ListLocation } from 'src/app/models/ListLocation';
import { Tour } from 'src/app/models/Tour';
import { TourDate } from 'src/app/models/TourDate';
import { TourPolicy } from 'src/app/models/TourPolicy';
import { TourType } from 'src/app/models/TourType';
import { LocationService } from 'src/services/location.service';
import { PolicyService } from 'src/services/policy.service';
import { TourTimeService } from 'src/services/tour-time.service';
import { TourTypeService } from 'src/services/tour-type.service';
import { TourService } from 'src/services/tour.service';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.css']
})
export class AddTourComponent implements OnInit {
  @Output() TourUpdate = new EventEmitter<Tour[]>() 
  public Editor = Editor;
  data : string = "";
  location: ListLocation = new ListLocation;
  tourDate: TourDate[] = [];
  tourType: TourType[] = [];
  tourPolicy: TourPolicy[] = [];
  formTour: Tour = new Tour();
  dateNow: Date = new Date();
  
  constructor(private LocationService: LocationService, private tourDateService: TourTimeService, private tourTypeService: TourTypeService, private tourPolicyService: PolicyService, private tourService: TourService) {

   }

  ngOnInit(): void {
    this.LocationService.getListLocation().subscribe((result: ListLocation)=> (this.location = result));
    this.tourDateService.getTourDate().subscribe((result: TourDate[]) => (this.tourDate = result));
    this.tourTypeService.getTourType().subscribe((result: TourType[]) => (this.tourType = result));
    this.tourPolicyService.getTourPolicy().subscribe((result: TourPolicy[]) => (this.tourPolicy = result));
  }

  imageUrls: string[] = [];
  onFileSelected(event: any) {
    console.log(this.data)
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrls.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
    
   
  }
  createTourTime(tour: Tour){
    this.tourService.createTour(tour).subscribe( (tour: Tour[]) => this.TourUpdate.emit(tour));
    console.log(tour)

  }
}
