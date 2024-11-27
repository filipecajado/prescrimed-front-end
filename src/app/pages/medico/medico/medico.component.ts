import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, of } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { ToastComponent } from 'src/app/shared/components/toaster/toast/toast.component';
import { MedicoEntity } from 'src/app/shared/domains/medico/medico';
import { MedicoServiceMock } from 'src/app/shared/mock/services/medico.service';

import { types, units } from 'src/app/shared/utils/global-variables';

@Component({
    selector: 'app-medico',
    templateUrl: './medico.component.html',
    styleUrls: ['./medico.component.scss']
})
export class MedicoComponent implements OnInit{
    @ViewChild('confirmModal') confirmModal: ConfirmModalComponent | undefined;

    types = types;
    units = units;

    readonly masks = {
      phoneMask: '(00) 00000-0000',
      cnpjMask: '00.000.000/0000-00',
      cpfMask: '000.000.000-00',
      cepMask: '00.000-000',
      srMask: '00.0000.0000.00-00'
    }

    constructor(
        private formBuilder: FormBuilder,
        private medicoService: MedicoServiceMock,
        private router: Router,
        private toastComponent: ToastComponent,
        private route: ActivatedRoute,
        ){


      route.queryParams.pipe(
        map((params) => Number(params['id'])),
        mergeMap(id => id ? this.medicoService.findById(id) : of('')),
      ).subscribe((medico) => {
        if(medico) this.setEditMode(medico as MedicoEntity);
      });
        }

    form: FormGroup = this.formBuilder.group({
        medicoData: this.formBuilder.group({
            id: new FormControl({ value: '', disabled: true }),
            nome: new FormControl(''),
            especializacao: new FormControl('', Validators.required),
            telefone: new FormControl('', Validators.required),
            cpf: new FormControl('', Validators.required),
        })
    });


    ngOnInit(): void {
    }

    setEditMode(medico: MedicoEntity) {
        const medicoData = this.form.get('medicoData');

        medicoData?.get('id')?.setValue(medico.id);
        medicoData?.get('nome')?.setValue(medico.nome);
        medicoData?.get('especializacao')?.setValue(medico.especializacao);
        medicoData?.get('telefone')?.setValue(medico.telefone);
        medicoData?.get('cpf')?.setValue(medico.cpf);


      }

    mapForm(): MedicoEntity{

        const rawValue = this.form.get('medicoData')?.getRawValue();

        const medico: MedicoEntity = {
            id: rawValue.id,
            nome: rawValue.nome,
            especializacao: rawValue.especializacao,
            telefone: rawValue.telefone,
            cpf: rawValue.cpf,
        }
        return medico;

    }

    async save(){
        const medico = this.mapForm();
        if(medico.id){
            const sucess = await this.medicoService.update(medico);
            if(sucess){
                this.toastComponent.showSuccessCustomMessage('Sucesso!', 'Medico atualizado com sucesso.', 3000);
                this.router.navigate(['/medicos']);
            }
        } else {
            await this.medicoService.save(medico);
            this.toastComponent.showSuccessCustomMessage('Sucesso!', 'Medico criado com sucesso.', 3000);
            this.router.navigate(['/medicos']);
        }

    }


  confirmCancel() {
    if (this.form.pristine) {
      this.router.navigate(['/medicos']);
    } else {
      this.confirmModal?.showCancelModal('Deseja mesmo cancelar?', '', true)
        .subscribe(isAccepted => {
          if (isAccepted) {
            this.router.navigate(['/medicos']);
          }
        });
    }
  }

}
