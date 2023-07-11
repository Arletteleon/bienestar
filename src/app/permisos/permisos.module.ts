import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermisosRoutingModule} from "./permisos-routing.module";

import { PermisosComponent} from "./permisos.component";
import {FooterPageModule} from "../footer/footer.module";
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PermisosRoutingModule,
    FooterPageModule
  ],
  declarations: [PermisosComponent]
})
export class PermisosModule {}
