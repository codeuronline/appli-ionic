import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FoundPage } from './found.page';
import { FoundPageRoutingModule } from './found-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoundPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [FoundPage]
})
export class FoundPageModule {}
