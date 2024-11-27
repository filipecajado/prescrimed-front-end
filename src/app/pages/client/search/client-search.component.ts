import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { ToastComponent } from 'src/app/shared/components/toaster/toast/toast.component';
import { ClientEntity } from 'src/app/shared/domains/client/client';
import { ClientServiceMock } from 'src/app/shared/mock/services/client.service';
import { MaterialServiceMock } from 'src/app/shared/mock/services/material.service';

@Component({
    selector: 'app-client-search',
    templateUrl: './client-search.component.html',
    styleUrls: ['./client-search.component.scss'],
})
export class ClientSearchComponent implements OnInit{

    dataSource = new MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort: MatSort | undefined;
    @ViewChild('confirmModal') confirmModal: ConfirmModalComponent | undefined;
    displayedColumns: string[] = ['id', 'fantasyName',  'cnpj', 'segment', 'phone', 'isActive', 'action'];
    lastFilterValue: string = '';
    fiterTable: string = '';

    constructor(
      private clientService: ClientServiceMock,
      private router: Router,
      private toastComponent: ToastComponent,
      ){      
    }
    
    ngOnInit(): void { 
        this.getClient();
    }

    async getClient(){
      const data = await this.clientService.getAll();

      this.dataSource = new MatTableDataSource(data);
      if (this.paginator)
      this.dataSource.paginator = this.paginator;
      if (this.sort)
      this.dataSource.sort = this.sort;
    }

    redirectToEditClient(id?: number){
      const extras: NavigationExtras = {
        queryParams: { id }
      }
     this.router.navigate(['/clients/edit-client'], extras);
    }
  

//   redirectTo(path: string, extras: NavigationExtras = {}) {
//     this.router.navigate([path], extras);
//   }


 async deleteCliente(id: number) {
    const success = await this.clientService.delete(id);
    if (success) {
      await this.getClient();
      this.toastComponent.showSuccessCustomMessage('Exclusão realizada com sucesso','', 3000);
    }
  }

  confirmDelete(cliente: ClientEntity) {
    this.confirmModal?.showModal('Deseja mesmo excluir este cliente?', 'Caso confirme, essa ação não poderá ser desfeita.')
    .subscribe(isAccepted => {
      if (isAccepted) {
        this.deleteCliente(cliente.id!);
      }
    });
  }

  
  applyFilter(event: any) {
    const filterValue = event.target.value.trim().toLowerCase();
    if (!filterValue && this.lastFilterValue) {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = filterValue;
    }
    this.lastFilterValue = filterValue;
  }
 
}
