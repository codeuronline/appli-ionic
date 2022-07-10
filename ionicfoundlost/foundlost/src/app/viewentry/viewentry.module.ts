import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewentryPageRoutingModule } from './viewentry-routing.module';

import { ViewentryPage } from './viewentry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewentryPageRoutingModule
  ],
  declarations: [ViewentryPage]
})
export class ViewentryPageModule {}
