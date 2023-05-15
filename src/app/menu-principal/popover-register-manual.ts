import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  template: `
    <ion-list>
      <ion-item>
        <button class="item" (click)="navigateToEntryTime()">
          Registrar Entrada
        </button>
      </ion-item>
      <ion-item>
        <button class="item" (click)="navigateToDepartureTime()">
          Registrar salida
        </button>
      </ion-item>
    </ion-list>
  `,
  styleUrls: ['menu-principal.page.css']
})
export class PopoverManualRegisterComponent {
  constructor(private popoverController: PopoverController, public navController: NavController) {}

  async navigateToEntryTime() {
    await this.navController.navigateForward('/menu_principal/ManualRegistration');
    await this.dismissPopover();
  }

  async navigateToDepartureTime() {
    await this.navController.navigateForward('/menu_princpal/ManualRegistrationExit');
    await this.dismissPopover();
  }

  async dismissPopover() {
    await this.popoverController.dismiss();
  }
}

