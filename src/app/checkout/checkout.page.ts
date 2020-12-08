import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { DatabaseService } from '../services/database.service';
import { AngularFirestore } from '@angular/fire/firestore';

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
  coords;
  constructor(public modalController: ModalController, private http: HttpClient, public dbs: DatabaseService){}
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

  select(value, index){
    this.searchRef.value = value;
    this.coords = this.coordinates[index];
    this.addresses = [];
    this.coordinates = [];
    
  }

  dismis(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  checkout( phone, house, streetName){
    
   this.dbs.order(phone, house, streetName, this.coords)

  }
  
}
