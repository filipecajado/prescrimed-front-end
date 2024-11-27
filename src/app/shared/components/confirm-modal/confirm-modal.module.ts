import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    ConfirmModalComponent,
  ],
  exports: [
    ConfirmModalComponent,
  ],
  imports: [
    ConfirmDialogModule,
    CommonModule
  ]
})
export class ConfirmModalModule { }