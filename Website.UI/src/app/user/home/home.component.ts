import { Component, OnInit } from '@angular/core';
import { Tour } from 'src/app/models/Tour';
import { ImageService } from 'src/services/image.service';
import { OrderService } from 'src/services/order.service';
import { TourDetailsService } from 'src/services/tour-details.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  position = 0;
  choose = 'tour';
  listTour : Tour[] = []
  load = [1,2,3,4,5,6,7,8];
  listFirstImg = new Map<number,string>()
  isLoad = true;
  isNull = false;
  slide: any = [
    {
      title: "anh1",
      url: "https://toquoc.mediacdn.vn/280518851207290880/2023/4/5/3333380841899454470574571287910598869949696n-1680712798929833722222.jpeg"
    },
    {
      title: "anh2",
      url: "https://toquoc.mediacdn.vn/280518851207290880/2023/4/5/3332231232221775935923168221344597140317230n-16807128251261233391522.jpeg"
    },
    {
      title: "anh3",
      url: "https://ik.imagekit.io/tvlk/blog/2022/02/dia-diem-du-lich-viet-nam-cover.jpeg"
    }
  ]
  arrowNext() {
    this.position = (this.position + 1 ) % this.slide.length
    
  }
  arrowBack() {
   this.position = (this.position - 1 + this.slide.length ) % this.slide.length
  
  }
  updateChoose(choose:string){
    this.choose = choose
  }

  constructor(private orderService:OrderService, private tourDetails:TourDetailsService, private imageService:ImageService) { }

  ngOnInit(): void {
    this.orderService.getTopOrder().subscribe(result => {
      if(result.length < 1) {
        this.isNull = true;
      }
      this.isLoad = false;
      for(let i = 0; i < result.length ; i++){
         this.tourDetails.getTourDetails(result[i].tourId).subscribe(
          result => {
            if(!this.listTour.includes(result)){
              this.listTour.push(result)
              this.imageService.getFirstTourImage().subscribe((result: any) => {
                for(let i = 0 ; i < result.length ; i++) {
                    this.listFirstImg.set(result[i].tourId, result[i].url)
                }
              })
            }
        })
      }
      
      
    })
    this.autoNextSlide();
  }
  autoNextSlide(): void{
  setInterval(() => {
      this.arrowNext();
    },5000)
  }

}
