import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthentificatePageRoutingModule } from './authentificate-routing.module';

import { AuthentificatePage } from './authentificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthentificatePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AuthentificatePage]
})
export class AuthentificatePageModule {}
