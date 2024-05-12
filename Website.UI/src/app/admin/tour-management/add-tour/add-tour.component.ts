import { Component, OnInit } from '@angular/core';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.css']
})
export class AddTourComponent implements OnInit {
  public Editor = Editor;
  constructor() { }

  ngOnInit(): void {
  }

  imageUrls: string[] = [];
  onFileSelected(event: any) {
    this.imageUrls = []
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
