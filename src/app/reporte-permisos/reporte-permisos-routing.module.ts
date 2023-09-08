import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportePermisosComponent} from "./reporte-permisos.component";

const routes: Routes = [
  {
    path: '',
    component: ReportePermisosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportePermisosRoutingModule {}
