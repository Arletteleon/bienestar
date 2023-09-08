
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverRegisterComponent } from './popover.register.component';
import { PopoverExceptionComponent} from "./popover-exception.component";
import { Router} from "@angular/router";
import {PopoverReportesComponent} from "./popover.reportes.component";

@Component({
  selector: 'app-menu-principal',
  templateUrl: 'menu-principal.page.html',
  styleUrls: ['menu-principal.page.css']
})
export class MenuPrincipalPage {

  constructor(public popoverController: PopoverController, private router: Router) { }

  async registerPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverRegisterComponent,
      event: ev,
      translucent: true,
      showBackdrop: true,
    });
    return await popover.present();
    await this.dismissPopover();
  }

  async permissionsPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverExceptionComponent,
      event: ev,
      translucent: true,
      showBackdrop: true,
    });
    return await popover.present();
    await this.dismissPopover();
  }

  async reportes(ev: any){
    //this.router.navigate(['/menu_principal/pdf']);
    const popover = await this.popoverController.create({
      component: PopoverReportesComponent,
      event: ev,
      translucent: true,
      showBackdrop: true,
    });
    return await popover.present();
    await this.dismissPopover();
  }
  async configuracion(ev:any){
    this.router.navigate(['']);
  }
  async logOut(ev:any){
    this.router.navigate(['/']);
  }
  dismissPopover() {
    this.popoverController.dismiss();
  }
}
