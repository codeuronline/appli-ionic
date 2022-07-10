import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoundlistPage } from './foundlist.page';

const routes: Routes = [
  {
    path: '',
    component: FoundlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoundlistPageRoutingModule {}
