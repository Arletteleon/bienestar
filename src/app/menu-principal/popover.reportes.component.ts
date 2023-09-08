import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  template: `
    <ion-list>
      <ion-item>
        <button class="item" (click)="navigateToReportEntry()">
          Reporte de entrada
        </button>
      </ion-item>
      <ion-item>
        <button class="item" (click)="navigateToReportePermissions()">
          Reporte de permisos
        </button>
      </ion-item>
    </ion-list>
  `,
  styleUrls: ['menu-principal.page.css']

})
export class PopoverReportesComponent {
  constructor(private popoverController: PopoverController, public navController: NavController) {}

  async navigateToReportEntry() {
    await this.navController.navigateForward('/menu_principal/pdf');
    await this.dismissPopover();
  }
  async navigateToReportePermissions() {
    await this.navController.navigateForward('/menu_principal/reportePermisos');
    await this.dismissPopover();
  }
  async dismissPopover() {
    await this.popoverController.dismiss();
  }
}
