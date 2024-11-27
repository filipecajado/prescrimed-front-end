import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ToasterComponent } from './toaster.component';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    ToastModule,
  ],
  declarations: [
    ToasterComponent,
  ],
  providers: [
    ToasterComponent,
    MessageService,
  ],

  exports: [
  ToasterComponent,
  ]
})
export class ToasterModule {

}
