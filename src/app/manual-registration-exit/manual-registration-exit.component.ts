import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { InterfaceRegistrationTime } from '../interface/interface.registration.time';
import { AlertController } from '@ionic/angular';
import { CupoCheck} from "../Funciones/cupo.check";
import { StoreRegistration} from "../Funciones/store.registration";

interface User {
  cupo: number;
}


@Component({
  selector: 'app-manual-registration-exit',
  templateUrl: './manual-registration-exit.component.html',
  styleUrls: ['../manual-registration/manual-registration.component.css'],
})
export class ManualRegistrationExitComponent  implements OnInit {
  private usersCollection!: AngularFirestoreCollection<User>;
  currentDate: string | undefined;
  date: string | undefined;
  inputValue: string = '';
  user: InterfaceRegistrationTime = {
    cupo: 0,
    time: new Date(),
  };

  constructor(
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private cupoCheck: CupoCheck,

    private registration: StoreRegistration
  ) {}

  ngOnInit() {
    moment.locale('es');
    setInterval(() => {
      const now = moment();
      this.currentDate = now.format('HH:mm:ss');
      this.date = now.format('dddd, D [de] MMMM [de] YYYY');
    }, 1000);

    this.usersCollection = this.firestore.collection<User>('users');
  }

  async registerManual() {
    this.user.cupo = parseInt(this.inputValue, 10);

    if (this.usersCollection) {
      await this.checkCupoExistence(this.user.cupo);
    }
  }

  async checkCupoExistence(cupo: number) {
    try {
      const exists = await this.cupoCheck.checkCupoExistence(cupo);

      if (exists) {
        console.log('El cupo existe en la colección');
        await this.storeRegistration(cupo);
      } else {
        console.log('El cupo no existe en la colección');
        this.showAlert('Error', 'El CUPO no está registrado', 'error');
      }
    } catch (error) {
      console.log('Error al consultar la base de datos', error);
      this.showAlert('Error', 'Error al consultar la base de datos', 'error');
    }
  }
  async storeRegistration(cupo: number) {
    try {
      await this.registration.storeRegistration(cupo);
      this.showAlert('Éxito', 'Entrada Registrada', 'success');
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

