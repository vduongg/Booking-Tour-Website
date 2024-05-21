import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEllipsisV, faXRay } from '@fortawesome/free-solid-svg-icons';
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
import { TourDetailsService } from 'src/services/tour-details.service';
import { TourTimeService } from 'src/services/tour-time.service';
import { TourTypeService } from 'src/services/tour-type.service';
import { TourService } from 'src/services/tour.service';

@Component({
  selector: 'app-edit-tour',
  templateUrl: './edit-tour.component.html',
  styleUrls: ['./edit-tour.component.css']
})
export class EditTourComponent implements OnInit {
  @Output() ImageUpdate = new EventEmitter<FormData[]>()
  @Output() TourUpdate = new EventEmitter<Tour[]>() 
  public Editor = Editor;
  data : string = "";
  location: ListLocation = new ListLocation;
  tourDate: TourDate[] = [];
  tourType: TourType[] = [];
  tourPolicy: TourPolicy[] = [];
  dateNow: Date = new Date();
  formTour: Tour = new Tour();
  listImage: TourImage[] = []
  constructor(private routeService:ActivatedRoute,  private tourService: TourService, private imageService:ImageService ,private LocationService: LocationService, private tourDateService: TourTimeService, private tourTypeService: TourTypeService, private tourPolicyService: PolicyService, private tourDetailsService: TourDetailsService ) { }
  ngOnInit(): void {
    this.LocationService.getListLocation().subscribe((result: ListLocation)=> (this.location = result));
    this.tourDateService.getTourDate().subscribe((result: TourDate[]) => (this.tourDate = result));
    this.tourTypeService.getTourType().subscribe((result: TourType[]) => (this.tourType = result));
    this.tourPolicyService.getTourPolicy().subscribe((result: TourPolicy[]) => (this.tourPolicy = result));
    this.routeService.params.subscribe(params => { 
        this.tourDetailsService.getTourDetails(params['id']).subscribe((result: Tour) => {
           this.formTour = result
           this.formTour.departureDate = this.formTour.departureDate.split('T')[0]
           this.imageService.getTourImage(this.formTour.tourId).subscribe((result: TourImage[])=> 
            {
              this.listImage = result; 
              this.listImage.forEach( e => {
                this.imageUrls.push(e.imageURL);
              });
            } )
        });
    });
   
}
  oldImage: string[] = []
  imageFiles: FormData[] = []
  imageUrls: string[] = [];
  onFileSelected(event: any) {


    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          if(!this.imageUrls.includes(reader.result as string))
            {
              this.imageUrls.push(reader.result as string)
              var formData: FormData = new FormData();
              formData.append('file',files[i],files[i].name);
              this.imageFiles.push(formData)
            }
         
        };
        reader.readAsDataURL(file);
       
      }
      
    }
    
    
   
  }
  closeImg(i:number){
    this.imageUrls.splice(i,1)
    this.imageFiles.splice(i,1)
    
  
  }
  editTour(tour: Tour){
    this.tourService.updateTour(this.formTour.tourId, tour).subscribe( (tour: Tour[]) => 
      { 
        this.TourUpdate.emit(tour)
        if(this.imageUrls.length == 0 && this.imageFiles.length == 0){
          this.imageService.deleteAllTourImage(this.formTour.tourId).subscribe()
        }
        else {
          this.listImage.forEach( item => {
            if( !this.imageUrls.includes(item.imageURL)) {
              this.imageService.deleteTourImage(item.imageId).subscribe()
            }
          });
          if(this.imageFiles.length > 0){
         
            for(let i = 0 ; i < this.imageFiles.length ; i++) {
              this.imageService.createTourImage(this.formTour.tourId, this.imageFiles[i]).subscribe((File: FormData[]) => 
                {
                  this.ImageUpdate.emit(File); 
                  window.location.reload();
              })
            }
          }
         
        }
      });
    
   
    
   
  }
  onKeyPress( event: KeyboardEvent) {
    const inputChar = event.key;
    if (!(inputChar >= 'a' && inputChar <= 'z') && isNaN(Number(inputChar)) && inputChar !=="@") {
      event.preventDefault(); 
    }
  }
}
