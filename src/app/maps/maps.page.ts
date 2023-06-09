import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
declare var google: any;


@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPageComponent  implements OnInit {
  @ViewChild('map', {static: true})
  mapElement!: ElementRef;
  map: any;

  constructor() {}

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        const mapOptions = {
          center: location,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        const userMarker = new google.maps.Marker({
          position: location,
          map: this.map,
          title: 'Your location'
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
}
