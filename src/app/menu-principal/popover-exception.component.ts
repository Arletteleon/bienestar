import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  template: `
    <ion-list>
      <ion-item>
        <button class="item" (click)="navigateToPagePermissions()">
          Permisos
        </button>
      </ion-item>
      <ion-item>
        <button class="item" (click)="navigateToPageManualRegister()">
          Registro Manual
        </button>
      </ion-item>
    </ion-list>
  `,
  styleUrls: ['menu-principal.page.css']

})
export class PopoverExceptionComponent {
  constructor(private popoverController: PopoverController, public navController: NavController) {}

  async navigateToPagePermissions() {
    await this.navController.navigateForward('/menu_principal/tab2');
    await this.dismissPopover();
  }
  async navigateToPageManualRegister() {
    await this.navController.navigateForward('Cambiar');
    await this.dismissPopover();
  }
  async dismissPopover() {
    await this.popoverController.dismiss();
  }
}
