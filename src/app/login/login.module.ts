import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginRoutingModule} from "./login-routing.module";

import { LoginComponent} from "./login.component";
import {FooterPageModule} from "../footer/footer.module";
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    FooterPageModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {}
