import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPrincipalPage } from './menu-principal.page';
import { IonicModule} from "@ionic/angular";
import { PopoverManualRegisterComponent} from "./popover-register-manual";
import { PopoverReportesComponent} from "./popover.reportes.component";

const routes: Routes = [
  {
    path: '',
    component: MenuPrincipalPage,
    children: [
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then( m => m.RegisterPageModule)
      },
      {
        path: 'delete',
        loadChildren: () => import('../delete/delete.module').then( m => m.DeleteModule)
      },
      {
        path: 'ManualRegistration',
        loadChildren: () => import('../manual-registration/manual-registration.module').then( m =>m.ManualRegistrationModule)
      },
      {
        path: 'ManualRegistrationExit',
        loadChildren: () => import('../manual-registration-exit/manual-registration-exit.module').then( m =>m.ManualRegistrationExitModule)
      },
      {
        path: 'permisos',
        loadChildren: () => import('../permisos/permisos.module').then(m =>m.PermisosModule)
      },
      {
        path: 'modificar',
        loadChildren: () => import('../modificar-registros/modificar-registros.module').then(m =>m.ModificarRegistrosModule)
      },
      {
        path: 'reportePermisos',
        loadChildren: () => import('../reporte-permisos/reporte-permisos.module').then(m =>m.ReportePermisosModule)
      },
      {
        path: 'pdf',
        loadChildren: () => import('../reporte/reporte.module').then(m =>m.ReporteModule)
      },
      {
        path: '',
        redirectTo: '/menu_principal/register',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu_principal/register',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),IonicModule],
  declarations: [
    PopoverManualRegisterComponent,
    PopoverReportesComponent
  ],
  entryComponents: [
    PopoverManualRegisterComponent,
    PopoverReportesComponent
  ]
})
export class MenuPrincipalPageRoutingModule {}
