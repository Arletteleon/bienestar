import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  template: `
    <ion-list>
      <ion-item>
        <button class="item" (click)="navigateToPageAddRegister()">
          Añadir Registro
        </button>
      </ion-item>
      <ion-item>
        <button class="item" (click)="navigateToPageModifications()">
          Modificar Registro
        </button>
      </ion-item>
      <ion-item>
        <button class="item" (click)="navigateToPageDeleteRegister()">
          Eliminar Registro
        </button>
      </ion-item>
    </ion-list>
  `,
  styleUrls: ['menu-principal.page.css']

})
export class PopoverRegisterComponent {
  constructor(private popoverController: PopoverController, public navController: NavController) {}

  async navigateToPageAddRegister() {
    await this.navController.navigateForward('/menu_principal/register');
    await this.dismissPopover();
  }
  async navigateToPageModifications() {
    await this.navController.navigateForward('CAMBIAR');
    await this.dismissPopover();
  }
  async navigateToPageDeleteRegister() {
    await this.navController.navigateForward('/menu_principal/delete');
    await this.dismissPopover();
  }
  async dismissPopover() {
    await this.popoverController.dismiss();
  }
}
