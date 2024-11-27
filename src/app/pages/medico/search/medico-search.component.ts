import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { ToastComponent } from 'src/app/shared/components/toaster/toast/toast.component';
import { MaterialEntity } from 'src/app/shared/domains/material/material';
import { MedicoServiceMock } from 'src/app/shared/mock/services/medico.service';


@Component({
    selector: 'app-medico-search',
    templateUrl: './medico-search.component.html',
    styleUrls: ['./medico-search.component.scss'],
})
export class MedicoSearchComponent implements OnInit{

    dataSource = new MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort: MatSort | undefined;
    @ViewChild('confirmModal') confirmModal: ConfirmModalComponent | undefined;
    displayedColumns: string[] = ['nome',  'especializacao', 'cpf' , 'telefone', 'action'];
    lastFilterValue: string = '';
    fiterTable: string = '';

    constructor(
      private medicoService: MedicoServiceMock,
      private router: Router,
      private toastComponent: ToastComponent,
      ){
    }

    ngOnInit(): void {
      this.getMaterial();
    }

    async getMaterial(){
      const data = await this.medicoService.getAll();

      this.dataSource = new MatTableDataSource(data);
      if (this.paginator)
      this.dataSource.paginator = this.paginator;
      if (this.sort)
      this.dataSource.sort = this.sort;
    }

    redirectToEditMaterial(id?: number){
      const extras: NavigationExtras = {
        queryParams: { id }
      }
      this.redirectTo('/medicos/edit-medico', extras);
    }


  redirectTo(path: string, extras: NavigationExtras = {}) {
    this.router.navigate([path], extras);
  }


 async deleteMaterial(id: number) {
    const success = await this.medicoService.delete(id);
    if (success) {
      await this.getMaterial();
      this.toastComponent.showSuccessCustomMessage('Exclusão realizada com sucesso','', 3000);
    }
  }

  confirmDelete(material: MaterialEntity) {
    this.confirmModal?.showModal('Deseja mesmo excluir este material?', 'Caso confirme, essa ação não poderá ser desfeita.')
    .subscribe(isAccepted => {
      if (isAccepted) {
        this.deleteMaterial(material.id!);
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
