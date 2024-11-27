import { NgModule } from "@angular/core";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastComponent } from "./toast.component";


@NgModule({
  imports: [ToastModule],
  declarations: [ToastComponent],
  providers: [
    ToastComponent,
    MessageService
  ],
  exports: [ToastComponent]
})
export class ToasterModule { }