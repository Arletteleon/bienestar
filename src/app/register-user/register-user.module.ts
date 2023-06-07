import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {RegisterUserRoutingModule} from "./register-user-routing.module";
import { RegisterUserComponent} from "./register-user.component";
import {FooterPageModule} from "../footer/footer.module";
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RegisterUserRoutingModule,
    FooterPageModule
  ],
  declarations: [RegisterUserComponent]
})
export class RegisterUserModule {}
