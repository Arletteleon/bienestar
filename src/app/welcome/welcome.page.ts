import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {AuthenticationPage} from "../authentication/authentication.page";
import {SignupPage} from "../signup/signup.page";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {


  constructor(
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  async login() {
    const modal = await this.modalCtrl.create({
      component: AuthenticationPage,
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'login-modal',
    })

    return await modal.present();
  }


  async register() {
    const modal = await this.modalCtrl.create({
      component: SignupPage,
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'register-modal',
    })

    return await modal.present();
  }
}
