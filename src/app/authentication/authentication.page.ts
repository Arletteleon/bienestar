import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Router} from "@angular/router";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { InterfaceRegistrationTime } from '../interface/interface.registration.time';
import { AlertController } from '@ionic/angular';
import { CupoCheck } from "../Funciones/cupo.check";
import { StoreRegistration} from "../Funciones/store.registration";
import {InterfaceRegistrationTimeExit} from "../interface/interface.registration.time.exit";
declare var google: any;

interface User {
  cupo: number;
}
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  @ViewChild('map', { static: true })
  mapElement!: ElementRef;
  map: any;
  circle: any; // Variable para almacenar el círculo

  private usersCollection!: AngularFirestoreCollection<User>;
  currentDate: string | undefined;
  date: string | undefined;
  inputValue: string = '';
  user: InterfaceRegistrationTimeExit = {
    cupo: 0,
    time: new Date(),
  };
  constructor(
    public modalCtrl: ModalController,
    private router: Router,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private cupoCheck: CupoCheck,
    private registration: StoreRegistration

  ) { }

  ngOnInit() {
    this.usersCollection = this.firestore.collection<User>('users');
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
    let valor = false; // Inicializa valor como false

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
          valor = isLocationWithinCircle; // Establece valor en función del resultado
        },
        (error) => {
          console.log('Error al obtener la ubicación:', error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }

    return valor;
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  login(){
    this.router.navigate(['/maps'])
    this.dismiss()
  }
  async registrationEntry() {
    this.user.cupo = parseInt(this.inputValue, 10);

    if (this.usersCollection) {
      await this.checkCupoExistence(this.user.cupo);
    }
  }
  async registrationExit(){
    this.user.cupo = parseInt(this.inputValue, 10);

    if (this.usersCollection) {
      await this.checkCupoExistence(this.user.cupo);
    }
  }

  async checkCupoExistence(cupo: number) {
    try {
      const exists = await this.cupoCheck.checkCupoExistence(cupo);

      if (exists) {
        await this.storeRegistration(cupo);
      } else {
        this.showAlert('Error', 'El CUPO no está registrado', 'error');
      }
    } catch (error) {
      this.showAlert('Error', 'Error al consultar la base de datos', 'error');
    }
  }
  async storeRegistration(cupo: number) {
    try {
      if(this.checkLocation()) {
        await this.registration.storeRegistrationExit(cupo);
        this.showAlert('Éxito', 'Entrada Registrada', 'success');
      }else {
        this.showAlert('Éxito', 'Debe estar cerca de las oficinas', 'success');
      }
    } catch (error) {
      this.showAlert('Error', 'Error al almacenar el registro', 'error');
    }
  }

  async showAlert(header: string, message: string, color: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
      cssClass:`custom-alert ${color}`,
    });
    await alert.present();
  }

}
