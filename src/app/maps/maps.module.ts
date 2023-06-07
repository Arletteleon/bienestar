import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {MapsRoutingModule} from "./maps-routing.module";
import { MapsComponent} from "./maps.component";
import {FooterPageModule} from "../footer/footer.module";
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MapsRoutingModule,
    FooterPageModule
  ],
  declarations: [MapsComponent]
})
export class MapsModule {}
