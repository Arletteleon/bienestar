import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteRoutingModule} from "./reporte-routing.module";

import { ReporteComponent} from "./reporte.component";
import {FooterPageModule} from "../footer/footer.module";
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReporteRoutingModule,
    FooterPageModule
  ],
  declarations: [ReporteComponent]
})
export class ReporteModule {}
