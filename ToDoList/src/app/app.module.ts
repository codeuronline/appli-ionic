import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
export const firebaseConfig = {
  apiKey: "AIzaSyAnTgbXLF9OMvNoV_wbnguvVnx2T-e3c2o",
  authDomain: "ionic-appli-project.firebaseapp.com",
  projectId: "ionic-appli-project",
  storageBucket: "ionic-appli-project.appspot.com",
  messagingSenderId: "386540319946",
  appId: "1:386540319946:web:d6e5d3e9f443edbb53b033"
};
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  AngularFireModule.initializeApp(firebaseConfig),AngularFireDatabaseModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }

  


