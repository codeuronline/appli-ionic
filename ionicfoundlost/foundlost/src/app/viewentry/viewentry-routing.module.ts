import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewentryPage } from './viewentry.page';

const routes: Routes = [
  {
    path: '',
    component: ViewentryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewentryPageRoutingModule {}
