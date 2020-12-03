import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOpts = {
    init: true,
    autoplay: {
      delay: 5000
    },
    speed: 1500,
    slidesPerView: 1
    
  }

  slideOptsProds = {
    init: true,
    autoplay: false,
    speed: 1500,
    slidesPerView: 2,
    spaceBetween : 10
  }
  constructor() {}

}
