import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialSearchComponent } from './search/material-search.component';
import { MaterialComponent } from './material/material.component';

const routes: Routes = [
  {
    path: '',
    component: MaterialSearchComponent,
  },
   {
     path: 'new-material',
     component: MaterialComponent,
   },
  {
    path: 'edit-material',
    component: MaterialComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }