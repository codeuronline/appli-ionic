import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewentryPage } from '../viewentry/viewentry.page';
import { LostlistPage } from './lostlist.page';


const routes: Routes = [
  {
    path: '',
    component: LostlistPage
  },
  {
    path: 'viewentry/:id',
    component: ViewentryPage,
    pathMatch: 'prefix'
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostlistPageRoutingModule { }
