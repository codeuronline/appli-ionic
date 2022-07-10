import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoundlistPageRoutingModule } from './foundlist-routing.module';

import { FoundlistPage } from './foundlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoundlistPageRoutingModule
  ],
  declarations: [FoundlistPage]
})
export class FoundlistPageModule {}
