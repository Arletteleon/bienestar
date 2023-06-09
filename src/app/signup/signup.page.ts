import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Router} from "@angular/router"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    private router: Router

  ) { }

  ngOnInit() {
  }

  async dismiss() {
    return await this.modalCtrl.dismiss();
  }

  register(){
    this.router.navigate(['/menu_principal'])
    this.dismiss()
  }

}
