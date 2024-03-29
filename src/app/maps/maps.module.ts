import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapsRoutingModule} from "./maps-routing.module";

import { MapsPage} from "./maps.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapsRoutingModule
  ],
  declarations: [MapsPage]
})
export class MapsPageModule {}
