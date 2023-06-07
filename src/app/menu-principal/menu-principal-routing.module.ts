import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPrincipalPage } from './menu-principal.page';
import { IonicModule} from "@ionic/angular";
import {PopoverManualRegisterComponent} from "./popover-register-manual";

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
    PopoverManualRegisterComponent
  ],
  entryComponents: [
    PopoverManualRegisterComponent
  ]
})
export class MenuPrincipalPageRoutingModule {}
