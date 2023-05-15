import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManualRegistrationExitRoutingModule} from "./manual-registration-exit-routing.module";

import { ManualRegistrationExitComponent} from "./manual-registration-exit.component";
import { FooterPageModule} from "../footer/footer.module";

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ManualRegistrationExitRoutingModule,
    FooterPageModule,
    HttpClientModule
  ],
  declarations: [ManualRegistrationExitComponent]
})
export class ManualRegistrationExitModule {}
