import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewentryPage } from '../viewentry/viewentry.page';
import { FoundlistPage } from './foundlist.page';

const routes: Routes = [
  {
    path: '',
    component: FoundlistPage
  }, {
    path: 'viewentry',
    component: ViewentryPage
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoundlistPageRoutingModule {}
