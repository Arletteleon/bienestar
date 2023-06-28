import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Router} from "@angular/router"

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  login(){
    this.router.navigate(['/maps'])
    this.dismiss()
  }
  registration(){

  }
  registrationExit(){

  }

}
