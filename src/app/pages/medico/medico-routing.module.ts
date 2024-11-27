import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicoComponent } from './medico/medico.component';
import { MedicoSearchComponent } from './search/medico-search.component';


const routes: Routes = [
  {
    path: '',
    component: MedicoSearchComponent,
  },
   {
     path: 'new-medico',
     component: MedicoComponent,
   },
  {
    path: 'edit-medico',
    component: MedicoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }
