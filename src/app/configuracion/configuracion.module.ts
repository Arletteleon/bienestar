import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionComponentRoutingModule} from "./configuracion.component-routing.module";

import { ConfiguracionComponent} from "./configuracion.component";
import {FooterPageModule} from "../footer/footer.module";
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ConfiguracionComponentRoutingModule,
    FooterPageModule
  ],
  declarations: [ConfiguracionComponent]
})
export class ConfiguracionModule {}
