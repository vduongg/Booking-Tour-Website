import { Component, OnInit } from '@angular/core';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { ListLocation } from 'src/app/models/ListLocation';
import { TourDate } from 'src/app/models/TourDate';
import { LocationService } from 'src/services/location.service';
import { TourService } from 'src/services/tour.service';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.css']
})
export class AddTourComponent implements OnInit {
  public Editor = Editor;
  data : string = "";
  location: ListLocation = new ListLocation;
  tourDate: TourDate[] = [];
  
  constructor(private LocationService: LocationService, private tourDateService: TourService) {

   }

  ngOnInit(): void {
    this.LocationService.getListLocation().subscribe((result: ListLocation)=> (this.location = result));
    this.tourDateService.getTourDate().subscribe((result: TourDate[]) => (this.tourDate = result));
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
}
