import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LostPage } from './lost.page';
import { LostPageRoutingModule } from './lost-routing.module';
import {  FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [LostPage]
})
export class LostPageModule {}
