import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Router} from "@angular/router";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { InterfaceRegistrationTime } from '../interface/interface.registration.time';
import { AlertController } from '@ionic/angular';
import { CupoCheck } from "../Funciones/cupo.check";
import { StoreRegistration} from "../Funciones/store.registration";

interface User {
  cupo: number;
}
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {

  private usersCollection!: AngularFirestoreCollection<User>;
  currentDate: string | undefined;
  date: string | undefined;
  inputValue: string = '';
  user: InterfaceRegistrationTime = {
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
