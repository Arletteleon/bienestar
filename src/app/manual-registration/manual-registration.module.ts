import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManualRegistrationRoutingModule} from "./manual-registration-routing.module";

import { ManualRegistrationComponent} from "./manual-registration.component";
import { FooterPageModule} from "../footer/footer.module";

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ManualRegistrationRoutingModule,
    FooterPageModule,
    HttpClientModule
  ],
  declarations: [ManualRegistrationComponent]
})
export class ManualRegistrationModule {}
