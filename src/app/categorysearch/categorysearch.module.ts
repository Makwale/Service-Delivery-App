import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorysearchPageRoutingModule } from './categorysearch-routing.module';

import { CategorysearchPage } from './categorysearch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorysearchPageRoutingModule
  ],
  declarations: [CategorysearchPage]
})
export class CategorysearchPageModule {}
