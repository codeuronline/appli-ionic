import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostlistPageRoutingModule } from './lostlist-routing.module';

import { LostlistPage } from './lostlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostlistPageRoutingModule
  ],
  declarations: [LostlistPage]
})
export class LostlistPageModule {}
