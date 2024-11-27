import { Component } from "@angular/core";
import { MessageService } from 'primeng/api';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'toast-component',
  template: `
    <p-toast position="top-right"></p-toast>
    `,
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  constructor(
    private messageService: MessageService
  ) { }

  showSuccessDefaultMessage() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Operação realizada com sucesso!' });
  }

  showSuccessCustomMessage(sumary: string, detail: string, life: number) {
    if(life > 0) {
      this.messageService.add({ severity: 'success', summary: sumary, detail: detail, life: life, icon: PrimeIcons.CHECK});
    } else {
      this.messageService.add({ severity: 'success', summary: sumary, detail: detail, sticky: true,  icon: PrimeIcons.CHECK});
    }
  }

  showErrorDefaultMessage() {
    this.messageService.add({ severity: 'error', summary: 'Ops!', detail: 'Desculpe. Ocorreu um erro ao processar sua solicitação.', sticky: true });
  }

  showErrorCustomMessage(sumary: string, detail: string) {
    this.messageService.add({ severity: 'error', summary: sumary, detail: detail, icon: 'pi pi-check2', life: 4000});
  }

  showWarningCustomMessage(sumary: string, detail: string = '') {
    this.messageService.add({ severity: 'warn', summary: sumary, detail: detail, life: 6000});
  }

  showInfoCustomMessage(sumary: string, detail: string) {
    this.messageService.add({ severity: 'info', summary: sumary, detail: detail, life: 6000 });
  }

  showApiError(error: any) {
    console.error(error);
    if (error.status === 422 && Array.isArray(error.error)) {
        error.error.forEach((e: any) => this.showWarningCustomMessage('Atenção!', e.message));
    } else if (error.status == 422 || error.status == 409 || error.status == 400) {
      this.showWarningCustomMessage('Atenção!', error.error.message);
    } else {
      this.showErrorDefaultMessage();
    }
  }

  showApiErrorGenerate(error: any) {
    console.error(error);
    if (error.status === 0 || error.status === 500 || error.status === 400 || error.status === 404) {
      this.showErrorDefaultMessage();
    }
  }
}
