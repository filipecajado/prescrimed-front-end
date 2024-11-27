import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExameSearchComponent } from './search/exame-search.component';
import { ExameComponent } from './exame/exame.component';


const routes: Routes = [
  {
    path: '',
    component: ExameSearchComponent,
  },
   {
     path: 'new-exame',
     component: ExameComponent,
   },
  {
    path: 'edit-exame',
    component: ExameComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExameRoutingModule { }
