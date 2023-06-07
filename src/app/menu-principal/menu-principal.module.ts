import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPrincipalPageRoutingModule } from './menu-principal-routing.module';

import { MenuPrincipalPage } from './menu-principal.page';
import { FooterPageModule} from "../footer/footer.module";
import { RegisterPageModule} from "../register/register.module";
import { DeleteModule} from "../delete/delete.module";
import { HeaderPageModule} from "../header/header.module";
import { ManualRegistrationModule} from "../manual-registration/manual-registration.module";
import { ManualRegistrationExitModule} from "../manual-registration-exit/manual-registration-exit.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPrincipalPageRoutingModule,
    FooterPageModule,
    RegisterPageModule,
    DeleteModule,
    ManualRegistrationModule,
    HeaderPageModule,
    ManualRegistrationExitModule
  ],
  exports: [
    MenuPrincipalPage
  ],
  declarations: [MenuPrincipalPage]
})
export class MenuPrincipalPageModule {}
