import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportePermisosRoutingModule} from "./reporte-permisos-routing.module";

import { ReportePermisosComponent} from "./reporte-permisos.component";
import {FooterPageModule} from "../footer/footer.module";
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReportePermisosRoutingModule,
    FooterPageModule
  ],
  declarations: [ReportePermisosComponent]
})
export class ReportePermisosModule {}
