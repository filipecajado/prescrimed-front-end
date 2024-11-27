import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'aop-toaster-component',
  template: `
    `,
})
export class ToasterComponent {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  showSuccessDefaultMessage() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Operação realizada com sucesso!' });
  }

  showSuccessCustomMessage(sumary: string, detail: string, life: number) {
    if(life > 0) {
      this.messageService.add({ severity: 'success', summary: sumary, detail: detail, life: life });
    } else {
      this.messageService.add({ severity: 'success', summary: sumary, detail: detail, sticky: true });
    }
  }

  showErrorDefaultMessage() {
    this.messageService.add({ severity: 'error', summary: 'Ops!', detail: 'Desculpe. Ocorreu um erro ao processar sua solicitação.', sticky: true });
  }

  showErrorCustomMessage(sumary: string, detail: string) {
    this.messageService.add({ severity: 'error', summary: sumary, detail: detail, sticky: true});
  }

  showWarningCustomMessage(sumary: string, detail: string) {
    this.messageService.add({ severity: 'warn', summary: sumary, detail: detail, life: 6000 });
  }

  showApiError(error: any) {
    console.error(error);
    if (error.status === 422) {
      error.error.forEach((e: any) => this.showWarningCustomMessage('Atenção!', e.message));
    } else if (error.code === 422) {
      this.showWarningCustomMessage('Atenção!', error.message);
    } else if (error.status === 401) {
      this.router.navigate(['unauthorized/access/'], { queryParams: {} });
    } else {
      this.showErrorDefaultMessage();
    }
  }

  showApiErrorGenerate(error: any) {
    console.error(error);
    if (error.status === 401) {
      this.router.navigate(['unauthorized/access/'], { queryParams: {} });
    } else if (error.status === 0 || error.status === 500 || error.status === 400 || error.status === 404) {
      this.showErrorDefaultMessage();
    }
  }

}
