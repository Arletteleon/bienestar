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
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
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
