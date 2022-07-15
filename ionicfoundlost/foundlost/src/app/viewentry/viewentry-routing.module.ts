import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewentryPage } from './viewentry.page';

const routes: Routes = [
  {
    path: ':id',
    component: ViewentryPage
  },

//   {
//     path: 'viewentry/:id',
//     component: ViewentryPage
//   }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewentryPageRoutingModule {}
