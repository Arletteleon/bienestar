import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManualRegistrationExitComponent} from "./manual-registration-exit.component";

const routes: Routes = [
  {
    path: '',
    component: ManualRegistrationExitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualRegistrationExitRoutingModule {}
