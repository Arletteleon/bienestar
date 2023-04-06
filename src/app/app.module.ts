import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopoverRegisterComponent } from './menu-principal/popover.register.component';
import { PopoverExceptionComponent} from "./menu-principal/popover-exception.component";


@NgModule({
  declarations: [AppComponent, PopoverRegisterComponent,PopoverExceptionComponent],
  entryComponents: [PopoverRegisterComponent,PopoverExceptionComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
