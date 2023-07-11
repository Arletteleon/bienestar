import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  @ViewChild('map', { static: true })
  mapElement!: ElementRef;
  map: any;
  circle: any; // Variable para almacenar el círculo

  constructor() {}

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          const mapOptions = {
            center: location,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
          };
          this.map = new google.maps.Map(
            this.mapElement.nativeElement,
            mapOptions
          );

          const latitude = 17.06404624693992;
          const longitude = -96.71897578134413;
          const circleOptions = {
            strokeColor: '#48ff00', // Color del borde del círculo
            strokeOpacity: 0.8, // Opacidad del borde (valor entre 0 y 1)
            strokeWeight: 2, // Grosor del borde en píxeles
            fillColor: '#0059ff', // Color de relleno del círculo
            fillOpacity: 0.35, // Opacidad del relleno (valor entre 0 y 1)
            map: this.map, // Mapa al que se añadirá el círculo
            center: new google.maps.LatLng(latitude, longitude), // Centro del círculo
            radius: 100, // Radio del círculo en metros
          };
          const userMarker2 = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: this.map,
            title: 'Location',
          });

          this.circle = new google.maps.Circle(circleOptions);
          const userMarker = new google.maps.Marker({
            position: location,
            map: this.map,
            title: 'Your location',
          });
        },
        (error) => {
          console.log('Error al obtener la ubicación:', error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  checkLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          const isLocationWithinCircle =
            google.maps.geometry.spherical.computeDistanceBetween(
              userLocation,
              this.circle.getCenter()
            ) <= this.circle.getRadius();

          console.log('Is location within circle:', isLocationWithinCircle);
        },
        (error) => {
          console.log('Error al obtener la ubicación:', error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
