import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { PopoverManualRegisterComponent} from "./popover-register-manual";

@Component({
  template: `
    <ion-list>
      <ion-item>
        <button class="item" (click)="navigateToPagePermissions()">
          Permisos
        </button>
      </ion-item>
      <ion-item>
        <button class="item" (click)="navigateToPageManualRegister($event)">
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

  async navigateToPageManualRegister(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverManualRegisterComponent,
      event: ev,
      translucent: true,
      showBackdrop: true,
    });
    return await popover.present();
    await this.dismissPopover();
  }

  async dismissPopover() {
    await this.popoverController.dismiss();
  }
}
