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
{// route pour foundlist
    path: 'foundlist',
    loadChildren: () => import('./foundlist/foundlist.module').then(m => m.FoundlistPageModule)
  },
 {// route pour lostlist
    path: 'lostlist',
    loadChildren: () => import('./lostlist/lostlist.module').then(m => m.LostlistPageModule)
  },
  {// route pour viewentry avec parametre id qui correspond à l'id de l'objet à partir de lostfound
    path: 'lostlist/viewentry/:id',
    loadChildren: () => import('./viewentry/viewentry.module').then(m => m.ViewentryPageModule),
  },
  {// route pour viewentry avec parametre id qui correspond à l'id de l'objet à partir de foundlist
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
 