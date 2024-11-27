import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsultaSearchComponent } from './search/consulta-search.component';
import { ConsultaComponent } from './consulta/consulta.component';


const routes: Routes = [
  {
    path: '',
    component: ConsultaSearchComponent,
  },
   {
     path: 'new-consulta',
     component: ConsultaComponent,
   },
  {
    path: 'edit-consulta',
    component: ConsultaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }
