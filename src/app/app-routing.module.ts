import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list/:newsCat', loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'newsdisplay/:newsID', loadChildren: './newsdisplay/newsdisplay.module#NewsdisplayPageModule' },
  { path: 'upcoming', loadChildren: './upcoming/upcoming.module#UpcomingPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
