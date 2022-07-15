import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ViewentryPageRoutingModule } from './viewentry-routing.module';
import { ViewentryPage } from './viewentry.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewentryPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ViewentryPage]
})
export class ViewentryPageModule {}
