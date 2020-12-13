import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorysearchPage } from './categorysearch.page';

const routes: Routes = [
  {
    path: '',
    component: CategorysearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorysearchPageRoutingModule {}
