import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopoverRegisterComponent } from './menu-principal/popover.register.component';
import { PopoverExceptionComponent} from "./menu-principal/popover-exception.component";

import { AngularFireModule} from "@angular/fire/compat";
import { AngularFireAuthModule} from "@angular/fire/compat/auth";
import { AngularFireDatabaseModule} from "@angular/fire/compat/database";
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, PopoverRegisterComponent,PopoverExceptionComponent],
  entryComponents: [PopoverRegisterComponent,PopoverExceptionComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
