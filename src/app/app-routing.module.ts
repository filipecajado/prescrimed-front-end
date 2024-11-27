import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch:'full'},
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
    { path: 'material', loadChildren: () => import('./pages/material/material.module').then(m => m.MaterialModule) },
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
    { path: 'clients', loadChildren: () => import('./pages/client/client.module').then(m => m.ClientModule) },
    { path: 'medicos', loadChildren: () => import('./pages/medico/medico.module').then(m => m.MedicoModule) },
    { path: 'pacientes', loadChildren: () => import('./pages/paciente/paciente.module').then(m => m.PacienteModule) }

  ];


@NgModule({
    imports: [RouterModule.forRoot(routes,  { useHash: true })],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
