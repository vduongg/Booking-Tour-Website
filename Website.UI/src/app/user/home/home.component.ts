import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  position = 0;
  choose = 'tour';
  


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

  constructor() { }

  ngOnInit(): void {
    this.autoNextSlide();
  }
  autoNextSlide(): void{
  setInterval(() => {
      this.arrowNext();
    },5000)
  }

}
