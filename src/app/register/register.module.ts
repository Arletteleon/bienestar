import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import {FooterPageModule} from "../footer/footer.module";
import { HeaderPageModule} from "../header/header.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RegisterPageRoutingModule,
    FooterPageModule,
    HeaderPageModule,
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
