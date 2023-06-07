import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { AuthenticationPage } from './authentication.page';
import {IonicModule} from "@ionic/angular";

const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationPage,
  },
  {
    path: '',
    redirectTo: '/authentication',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule],
  declarations: [],
})
export class AuthenticationPageRoutingModule {}


