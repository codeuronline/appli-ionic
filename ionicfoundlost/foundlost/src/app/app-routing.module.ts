import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'authentificate',
    pathMatch: 'full'
  },
  {
    path: 'authentificate',
    loadChildren: () => import('./authentificate/authentificate.module').then( m => m.AuthentificatePageModule)
  },
  {
    path: 'found',
    loadChildren: () => import('./found/found.module').then(m => m.FoundPageModule)
  },
  {
    path: 'lost',
    loadChildren: () => import('./lost/lost.module').then(m => m.LostPageModule)
  },
{
    path: 'foundlist',
    loadChildren: () => import('./foundlist/foundlist.module').then(m => m.FoundlistPageModule)
  },
 {
    path: 'lostlist',
    loadChildren: () => import('./lostlist/lostlist.module').then(m => m.LostlistPageModule)
  },
  {
    path: 'lostlist/viewentry/:id',
    loadChildren: () => import('./viewentry/viewentry.module').then(m => m.ViewentryPageModule),
  },
  {
     path: 'foundlist/viewentry/:id',
     loadChildren: () => import('./viewentry/viewentry.module').then(m => m.ViewentryPageModule),
   },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 