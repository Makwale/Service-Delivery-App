import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  geometry: Geometry[];
  query: [];
}

export interface Feature {
  place_name: string;
  geometry: string;

}
export interface Geometry {
  coordinates: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
	key = 'pk.eyJ1IjoibWFudWVsbWFrd2FsZSIsImEiOiJja2hsc3lmYWUyZzRnMnRsNnY2NWIyeGR6In0.1MGnfpXj_dV2QBO3SchfqA';
  coordinates = [];
  addresses = [];
  list = [];
  searchRef;

  constructor(public modalController: ModalController, private http: HttpClient) { }

  ngOnInit() {
  }

  search(ref){
    this.searchRef = ref;
    
    this.searchWord(ref.value).subscribe(
      (features: Feature[]) => {
        this.coordinates = features.map(feat => feat.geometry)
        this.addresses = features.map(feat => feat.place_name)
        this.list = features;
      }
    )
  }


  searchWord(query){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    // tlint:disable-next-line:max-line-length
    return this.http.get(url + query + '.json?types=address&country=ZA&access_token='  + this.key )
      .pipe(map((res: MapboxOutput) => {
        return res.features;
      }));
  }

  select(value){
    this.searchRef.value = value;
    this.addresses = [];
    console.log(value);
  }

  dismis(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
