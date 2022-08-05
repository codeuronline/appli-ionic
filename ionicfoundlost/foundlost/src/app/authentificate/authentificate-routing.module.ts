import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthentificatePage } from './authentificate.page';

const routes: Routes = [
  {
    path: '',
    component: AuthentificatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthentificatePageRoutingModule {}
