import { Component, OnInit } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {InterfaceRegister} from "./interface.register";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.css'],
})
export class RegisterPage {

  /*handlerMessage = '';
  roleMessage = '';*/

  user: InterfaceRegister = { name: '', cupo:'', curp:'',rfc:'', state:'', job:'', hiring:'',dateAdmission:new Date()};


  constructor(private alertController: AlertController,private db: AngularFireDatabase) {}



  async addRegister() {
    if (this.user.name &&
      this.user.cupo &&
      this.user.curp &&
      this.user.rfc &&
      this.user.state &&
      this.user.job &&
      this.user.hiring &&
      //validar que la fecha no este vacia
      this.user.dateAdmission) {
        this.db.list('/users').push(this.user);
        this.user = {name: '', cupo: '', curp: '', rfc: '', state: '', job: '', hiring: '', dateAdmission: new Date()};
    }else {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Debe rellenar todos los campos',
        buttons: ['OK'],
      });
      await alert.present();
    }

  }


  /*async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';

            this.db.list('Users').push({
              Name: 'John Doe',
              Age: 30,
              email: 'johndoe@email.com'
            });
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }*/
}
