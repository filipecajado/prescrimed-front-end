import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class GlobalFunctions {
  constructor() { }

  //#region Tamanho da tela
  public screen(): string {
    if (window.screen.width < 576) {
      return 'mobile';
    } else if (window.screen.width < 992) {
      return 'tablet';
    } else if (window.screen.width <= 1200) {
      return 'notebook';
    } else {
      return 'desktop';
    }
  }

  public isTabletOrNotebook() {
    return this.screen() === 'tablet' || this.screen() === 'notebook';
  }

  public isMobile(): boolean {
    return this.screen() === 'mobile';
  }

  public isDesktop(): boolean {
    return this.screen() === 'desktop';
  }

  public isDesktopOrNotebook(): boolean {
    return this.screen() === 'desktop' || this.screen() === 'notebook';
  }

  public isTablet(): boolean {
    return this.screen() === 'tablet';
  }
  //#endregion Tamanho da tela

  public compareString(stringA: string, stringB: string): number {
    let valueA = stringA.toLocaleUpperCase().normalize("NFD")
      .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');

    let valueB = stringB.toLocaleUpperCase().normalize("NFD")
      .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');

    if(valueA < valueB) return -1;
    if(valueA > valueB) return 1;
    return 0;
  }

  public dateFormat(input: Date): string {

    const dia = String(input.getDate() + 1).padStart(2, '0');
    const mes = String(input.getMonth() + 1).padStart(2, '0');
    const ano = String(input.getFullYear());

    return `${dia}/${mes}/${ano}`;
  }

  isOnlyNumberRegisterState(event: KeyboardEvent, control?: AbstractControl|null): void {
    const key = event.key;
    if (key && isNaN(Number(key)) && key !== '.' && key !== '-' && key !== '/' && key !== 'P') {
      event.preventDefault();
    }
    if(key === 'P' && control?.value?.length > 0){
      event.preventDefault();
    }
  }

}
