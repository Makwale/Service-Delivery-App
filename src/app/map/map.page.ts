import { Component, OnInit } from '@angular/core';

declare var mapboxgl: any; 

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
	map;
	lat:number;
	lon:number;
  constructor() { }

  ngOnInit() {

  
  }

  ionViewDidEnter(){
  	mapboxgl.accessToken = 'pk.eyJ1IjoibWFudWVsbWFrd2FsZSIsImEiOiJja2hsc3lmYWUyZzRnMnRsNnY2NWIyeGR6In0.1MGnfpXj_dV2QBO3SchfqA';
  	
  	navigator.geolocation.getCurrentPosition( pos =>{
 		this.lat = pos.coords.latitude;
 		this.lon = pos.coords.longitude;

 		this.map = new mapboxgl.Map({
	        container: 'map',
	        countries: 'za',
	        style: 'mapbox://styles/mapbox/dark-v10',
	        center: [this.lon, this.lat],
	        zoom: 12,
   	 	});

   	 	this.map.addControl(new mapboxgl.NavigationControl());

		this.map.addControl(
		    new MapboxDirections({
		      accessToken: mapboxgl.accessToken
		    }),
		      'bottom-left'
		 );

		this.map.addControl(new mapboxgl.FullscreenControl());

		this.map.addControl(new mapboxgl.GeolocateControl({
			positionOptions: {
			enableHighAccuracy: true
			},
			trackUserLocation: true
		}));

 	})





   

  }



}
