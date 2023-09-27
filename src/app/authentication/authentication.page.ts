import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Router} from "@angular/router";
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {CupoCheck} from "../Funciones/cupo.check";
import {StoreRegistration} from "../Funciones/store.registration";
import * as moment from 'moment';
import {InterfaceRegistrationTime} from '../interface/interface.registration.time';
import {AlertService} from "../Funciones/alert.service";
import {PuntualidadService} from "../Funciones/puntualidad.service";


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
  @ViewChild('map', {static: true})
  mapElement!: ElementRef;
  map: any;
  circle: any; // Variable para almacenar el círculo

  private usersCollection!: AngularFirestoreCollection<User>;
  currentDate: string | undefined;
  date: string | undefined;
  inputValue: string = '';
  user: InterfaceRegistrationTime = {
    cupo: 0,
    time: new Date(),
    puntualidad: "",
  };

  constructor(
    public modalCtrl: ModalController,
    private router: Router,
    private firestore: AngularFirestore,
    private cupoCheck: CupoCheck,
    private registration: StoreRegistration,
    private alertService: AlertService,
    private puntualidadService: PuntualidadService,
  ) {
  }

  ngOnInit() {
    this.initMap();
    this.usersCollection = this.firestore.collection<User>('users');
    this.updateDateTime();
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
// 18.0092095,-94.5508816
          //17.06404624693992, -96.71897578134413
          const latitude = 18.0092095;
          const longitude = -94.5508816;
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
        {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }


  updateDateTime() {
    moment.locale('es');
    setInterval(() => {
      const now = moment();
      this.currentDate = now.format('HH:mm:ss');
      this.date = now.format('dddd, D [de] MMMM [de] YYYY');
    }, 1000);
  }


  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  login() {
    this.router.navigate(['/maps']);
    this.dismiss();
  }

  async registrationEntry() {
    let isLocationValid: boolean;
    const cupo = parseInt(this.inputValue, 10);

    if (this.usersCollection) {
      try {
        const exists = await this.cupoCheck.checkCupoExistence(cupo);

        if (exists) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const userLocation = new google.maps.LatLng(
                  position.coords.latitude,
                  position.coords.longitude
                );

                if (userLocation) {
                  isLocationValid =
                    google.maps.geometry.spherical.computeDistanceBetween(
                      userLocation,
                      this.circle.getCenter()
                    ) <= this.circle.getRadius();
                  console.log(isLocationValid)

                  if (isLocationValid) {
                    const horaRegistro = new Date();
                    const estadoPuntualidad = this.puntualidadService.calcularEstadoPuntualidad(horaRegistro);
                    await this.registration.storeRegistration(cupo, estadoPuntualidad);
                    window.location.href = 'https://login-face-bienestar.web.app/identificar';

                    // this.alertService.showAlert('Éxito', 'Entrada Registrada');

                    //this.showCamera = true;

                  } else {
                    this.alertService.showAlert('Error', 'Debe estar cerca de las oficinas');
                  }
                }
              },
              (error) => {
                this.alertService.showAlert('Error', 'Error al obtener la ubicación');
              },
              {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}
            );
          } else {
            this.alertService.showAlert('Error', 'Geolocation is not supported by this browser.');
          }
        } else {
          this.alertService.showAlert('Error', 'CUPO no encontrado');
        }
      } catch (error) {
        this.alertService.showAlert('Error', 'Error al consultar la base de datos');
      }
    } else {
      this.alertService.showAlert('Error', 'No se pudo conectar a la base de datos');
    }
  }


  async registrationExit() {
    this.user.cupo = parseInt(this.inputValue, 10);
    try {
      if (this.usersCollection) {
        const exists = await this.cupoCheck.checkCupoExistence(this.user.cupo);
        if (exists) {
          await this.registration.storeRegistrationExit(this.user.cupo);
          this.alertService.showAlert('Éxito', 'Salida Registrada');
        } else {
          this.alertService.showAlert('Error', 'CUPO no encontrado');
        }
      }
    } catch (error) {
      this.alertService.showAlert('Error', 'Error al almacenar el registro');
    }


  }
}
