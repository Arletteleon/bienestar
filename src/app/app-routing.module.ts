import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'aa',
    loadChildren: () => import('./register-user/register-user.module').then( m => m.RegisterUserModule)
  },
  {
    path:'a',
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'a',
    loadChildren: () => import('./menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./maps/maps.module').then( m =>m.MapsModule)
  },

  {
    path: 'header',
    loadChildren: () => import('./header/header.module').then( m => m.HeaderPageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./footer/footer.module').then( m => m.FooterPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
