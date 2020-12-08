import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
          
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      
    {
      path: 'cart',
      loadChildren: () => import('../cart/cart.module').then( m => m.CartPageModule)
    },
    {
      path: 'map',
      loadChildren: () => import('../map/map.module').then( m => m.MapPageModule)
    },
    {
      path: 'home',
      loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
