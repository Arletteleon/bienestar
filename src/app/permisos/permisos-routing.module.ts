import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermisosComponent} from "./permisos.component";

const routes: Routes = [
  {
    path: '',
    component: PermisosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermisosRoutingModule {}
