import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { InterfaceRegistrationTime } from "../interface/interface.registration.time";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-manual-registration-exit',
  templateUrl: './manual-registration-exit.component.html',
  styleUrls: ['../manual-registration/manual-registration.component.css'],
})
export class ManualRegistrationExitComponent implements OnInit {

  currentDate: string | undefined;
  date: string | undefined;
  cupo: string = '';

  isSubmitting: boolean = false;
  constructor(
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    moment.locale('es');
    setInterval(() => {
      const now = moment();
      this.currentDate = now.format('HH:mm:ss');
      this.date = now.format('dddd, D [de] MMMM [de] YYYY');
    }, 1000);
  }

  updateCupo(value: string) {
    this.cupo = value;
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
    if (this.isSubmitting) {
      return; // Evitar múltiples registros si ya se está procesando uno
    }

    this.isSubmitting = true;

    this.checkIfExists('cupo', this.cupo).subscribe(async result => {
      if (result.length > 0) {
        const data = {
          cupo: this.cupo,
          time: moment(this.date, 'dddd, D [de] MMMM [de] YYYY').toDate()
        };
        await this.firestore.collection('registrationTime').add(data);
        await this.showAlert('Éxito', 'Entrada Registrada');
        console.log('El dato existe en el campo del documento.');
      } else {
        await this.showAlert('Fallo', 'El cupo no existe');
        console.log('El dato no existe en el campo del documento.');
      }

      this.isSubmitting = false;
    });
  }

  checkIfExists(fieldName: string, value: any): Observable<any[]> {
    return this.firestore.collection('registrationTime', ref => ref.where(fieldName, '==', value)).valueChanges();
  }
}
