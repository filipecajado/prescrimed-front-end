import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientSearchComponent } from './search/client-search.component';
import { ClientComponent } from './main/client.component';


const routes: Routes = [
  {
    path: '',
    component: ClientSearchComponent,
  },
   {
     path: 'new-client',
     component: ClientComponent,
   },
   {
    path: 'edit-client',
    component: ClientComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }