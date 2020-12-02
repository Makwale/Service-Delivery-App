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
    speed: 1000
  
  }
  constructor() {}

}
