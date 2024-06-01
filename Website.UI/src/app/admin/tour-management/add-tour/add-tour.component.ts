import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { ListLocation } from 'src/app/models/ListLocation';
import { Tour } from 'src/app/models/Tour';
import { TourDate } from 'src/app/models/TourDate';
import { TourImage } from 'src/app/models/TourImage';
import { TourPolicy } from 'src/app/models/TourPolicy';
import { TourType } from 'src/app/models/TourType';
import { ImageService } from 'src/services/image.service';
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
  @Output() ImageUpdate = new EventEmitter<FormData[]>()
  @Output() TourUpdate = new EventEmitter<Tour[]>() 
  public Editor = Editor;
  data : string = "";
  currentDate?: string;
  location: ListLocation = new ListLocation;
  tourDate: TourDate[] = [];
  tourType: TourType[] = [];
  tourPolicy: TourPolicy[] = [];
  formTour: Tour = new Tour();
  dateNow: Date = new Date();
  tourItem: Tour = new Tour();
  img:TourImage = new TourImage();
  constructor(private LocationService: LocationService, private imageService: ImageService ,private tourDateService: TourTimeService, private tourTypeService: TourTypeService, private tourPolicyService: PolicyService, private tourService: TourService, ) {
    this.currentDate = `${this.dateNow.getFullYear()}-${ (this.dateNow.getMonth()+1) <10? "0"+ (this.dateNow.getMonth()+1)  : (this.dateNow.getMonth() + 1)}-${this.dateNow.getDate() < 10? "0"+ this.dateNow.getDate():this.dateNow.getDate()}`;
   }

  ngOnInit(): void {
    this.LocationService.getListLocation().subscribe((result: ListLocation)=> (this.location = result));
    this.tourDateService.getTourDate().subscribe((result: TourDate[]) => (this.tourDate = result));
    this.tourTypeService.getTourType().subscribe((result: TourType[]) => (this.tourType = result));
    this.tourPolicyService.getTourPolicy().subscribe((result: TourPolicy[]) => (this.tourPolicy = result));
    
  }

  imageFiles: FormData[] = []
  imageUrls: string[] = []
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
      var formData: FormData = new FormData();
          formData.append('file',files[i],files[i].name);
          this.imageFiles.push(formData)
         
    }
  }
    
  createTour(tour: Tour){
    
    tour.createDate = `${this.dateNow.getFullYear()}-${ (this.dateNow.getMonth()+1) <10? "0"+ (this.dateNow.getMonth()+1)  : (this.dateNow.getMonth() + 1)}-${this.dateNow.getDate() < 10? "0"+ this.dateNow.getDate():this.dateNow.getDate() }T${this.dateNow.getHours()< 10?"0"+this.dateNow.getHours() : this.dateNow.getHours() }:${this.dateNow.getSeconds()< 10?"0"+this.dateNow.getSeconds() : this.dateNow.getSeconds() }:${this.dateNow.getMinutes()< 10?"0"+this.dateNow.getMinutes() : this.dateNow.getMinutes() }`;
    this.tourService.createTour(tour).subscribe( (tour: Tour[]) => 
      {
        this.TourUpdate.emit(tour);
        this.tourService.getLastTour(1).subscribe((result: Tour) => {
          this.tourItem = result;
          for(let i = 0 ; i < this.imageFiles.length ; i++) {
            this.imageService.createTourImage(result.tourId, this.imageFiles[i]).subscribe((File: FormData[]) => this.ImageUpdate.emit(File))
          }
        })
      });
   
    console.log(tour)
    
   
  
  }
  onKeyPress( event: KeyboardEvent) {
    const inputChar = event.key;
    if (!(inputChar >= 'a' && inputChar <= 'z') && (!(inputChar >= 'A' && inputChar <= 'Z')) && isNaN(Number(inputChar)) && inputChar !=="@") {
      event.preventDefault(); 
    }
  }
  
}
