import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteComponent} from "./delete.component";
import {FooterPageModule} from "../footer/footer.module";
import { DeleteRoutingModule} from "./delete-routing.module";


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DeleteRoutingModule,
    FooterPageModule
  ],
  declarations: [DeleteComponent]
})
export class DeleteModule {}
