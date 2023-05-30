import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManualRegistrationComponent} from "./manual-registration.component";

const routes: Routes = [
  {
    path: '',
    component: ManualRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualRegistrationRoutingModule {}