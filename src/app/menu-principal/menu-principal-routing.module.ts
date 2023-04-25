import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPrincipalPage } from './menu-principal.page';

const routes: Routes = [
  {
    path: 'menu_principal',
    component: MenuPrincipalPage,
    children: [
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then( m => m.RegisterPageModule)
      },
      {
        path:'delete',
        loadChildren: () => import('../delete/delete.module').then( m => m.DeleteModule)
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MenuPrincipalPageRoutingModule {}
