import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarRegistrosRoutingModule} from "./modificar-registros-routing.module";

import { ModificarRegistrosComponent} from "./modificar-registros.component";
import {FooterPageModule} from "../footer/footer.module";
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ModificarRegistrosRoutingModule,
    FooterPageModule
  ],
  declarations: [ModificarRegistrosComponent]
})
export class ModificarRegistrosModule {}
