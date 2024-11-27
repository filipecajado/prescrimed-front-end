import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Observable, Subject, take } from 'rxjs';


@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  title: string = '';
  text: string = '';
  cancelButton: string = 'Cancelar';
  confirmButton: string = 'Confirmar';
  isEdit?: boolean = false;

  private resultSubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private confirmationService: ConfirmationService,
  
  ) { }

  ngOnInit(): void {
  }


  showModal(title: string, text?: string): Observable<boolean> {
    this.title = title;
    this.text = text ? text : '';

    this.confirmationService.confirm({
      accept: () => {
        this.resultSubject.next(true);
      },
      reject: () => {
        this.resultSubject.next(false);
      }
    });

    return this.resultSubject.asObservable().pipe(take(1));
  }

  showCancelModal(title: string, text?: string, isEditMaterial?: boolean): Observable<boolean> {
    this.title = title;
    this.text = text ? text : '';
    this.isEdit = isEditMaterial;

    this.confirmationService.confirm({
      accept: () => {
        this.resultSubject.next(true);
      },
      reject: () => {
        this.resultSubject.next(false);
      }
    });

    return this.resultSubject.asObservable().pipe(take(1));
  }

}
