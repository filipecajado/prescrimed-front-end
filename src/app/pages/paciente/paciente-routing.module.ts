import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PacienteSearchComponent } from './search/paciente-search.component';
import { PacienteComponent } from './paciente/paciente.component';


const routes: Routes = [
  {
    path: '',
    component: PacienteSearchComponent,
  },
   {
     path: 'new-paciente',
     component: PacienteComponent,
   },
  {
    path: 'edit-paciente',
    component: PacienteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
