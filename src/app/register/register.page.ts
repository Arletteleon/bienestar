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



  addRegister(){
    this.db.list('/users').push(this.user);
    this.user = { name: '', cupo:'', curp:'',rfc:'', state:'', job:'', hiring:'',dateAdmission:new Date() };
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
