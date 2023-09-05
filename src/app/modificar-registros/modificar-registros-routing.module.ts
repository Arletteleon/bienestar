import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarRegistrosComponent} from "./modificar-registros.component";

const routes: Routes = [
  {
    path: '',
    component: ModificarRegistrosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarRegistrosRoutingModule {}
