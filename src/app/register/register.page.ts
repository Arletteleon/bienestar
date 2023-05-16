import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { InterfaceRegister } from '../interface/interface.register';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.css'],
})
export class RegisterPage {

  handlerMessage: string = "";
  user: InterfaceRegister = {
    name: '',
    cupo: '',
    curp: '',
    rfc: '',
    state: '',
    job: '',
    hiring: '',
    dateAdmission: new Date()
  };

  constructor(
    private alertController: AlertController,
    private firestore: AngularFirestore
  ) {}

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
      cssClass: 'my-custom-alert',
    });
    await alert.present();
  }

  async addRegister() {
    if (
      this.user.name &&
      this.user.cupo &&
      this.user.curp &&
      this.user.rfc &&
      this.user.state &&
      this.user.job &&
      this.user.hiring &&
      this.user.dateAdmission
    ) {
      await this.firestore.collection('users').add(this.user);
      this.user = {
        name: '',
        cupo: '',
        curp: '',
        rfc: '',
        state: '',
        job: '',
        hiring: '',
        dateAdmission: new Date()
      };
      await this.showAlert('Éxito', 'Registro agregado correctamente');
    } else {
      await this.showAlert('Alerta', 'Debe rellenar todos los campos');
    }
  }
}
