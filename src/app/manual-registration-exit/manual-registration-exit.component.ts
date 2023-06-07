import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AngularFirestore} from "@angular/fire/compat/firestore";
import { InterfaceRegistrationTime} from "../interface/interface.registration.time";
import { AlertController} from "@ionic/angular";

@Component({
  selector: 'app-manual-registration-exit',
  templateUrl: './manual-registration-exit.component.html',
  styleUrls: ['../manual-registration/manual-registration.component.css'],
})
export class ManualRegistrationExitComponent  implements OnInit {

  currentDate: string | undefined;
  date: string | undefined;
  cupo: string = '';
  user: InterfaceRegistrationTime = {
    cupo: '',
    time: new Date()
  };

  constructor(
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
    moment.locale('es')
    setInterval(() => {
      const now = moment();
      this.currentDate = now.format('HH:mm:ss');
      this.date = now.format('dddd, D [de] MMMM [de] YYYY');
    }, 1000);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
      cssClass: 'my-custom-class'
    });
    await alert.present();
  }

  async registerManual() {
    await this.firestore.collection('registrationTime').add(this.user);
    await this.showAlert('Exito', 'Entrada Registrada');
  }

}

