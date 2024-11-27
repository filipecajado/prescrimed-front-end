import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, of } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { ToastComponent } from 'src/app/shared/components/toaster/toast/toast.component';
import { ExameEntity } from 'src/app/shared/domains/exame';
import { ExameServiceMock } from 'src/app/shared/mock/services/exame.service';
import { MedicoServiceMock } from 'src/app/shared/mock/services/medico.service';
import { PacienteServiceMock } from 'src/app/shared/mock/services/paciente.service';



import { types, units } from 'src/app/shared/utils/global-variables';

@Component({
    selector: 'app-exame',
    templateUrl: './exame.component.html',
    styleUrls: ['./exame.component.scss']
})
export class ExameComponent implements OnInit{
    @ViewChild('confirmModal') confirmModal: ConfirmModalComponent | undefined;

    types = types;
    units = units;
    medicos: any[] = []
    pacientes: any[] = []
    readonly masks = {
      phoneMask: '(00) 00000-0000',
      cnpjMask: '00.000.000/0000-00',
      cpfMask: '000.000.000-00',
      cepMask: '00.000-000',
      srMask: '00.0000.0000.00-00'
    }

    constructor(
        private formBuilder: FormBuilder,
        private exameService: ExameServiceMock,
        private medicoService: MedicoServiceMock,
        private pacientService: PacienteServiceMock,
        private router: Router,
        private toastComponent: ToastComponent,
        private route: ActivatedRoute,
        ){


      route.queryParams.pipe(
        map((params) => Number(params['id'])),
        mergeMap(id => id ? this.exameService.findById(id) : of('')),
      ).subscribe((exame) => {
        if(exame) this.setEditMode(exame as ExameEntity);
      });
        }

    form: FormGroup = this.formBuilder.group({
        exameData: this.formBuilder.group({
            id: new FormControl({ value: '', disabled: true }),
            medico_id: new FormControl(Validators.required),
            paciente_id: new FormControl(Validators.required),
            data_exame: new FormControl('', Validators.required),
            tipo_exame: new FormControl(''),
            observacoes: new FormControl(''),
            prescricao: new FormControl('', Validators.required),
            resultado: new FormControl('', Validators.required),

        })
    });


    async ngOnInit(): Promise<void> {
      this.medicos = await this.medicoService.getAll();
      this.pacientes = await this.pacientService.getAll();
    }

    setEditMode(exame: ExameEntity) {
        const exameData = this.form.get('exameData');

        exameData?.get('id')?.setValue(exame.id);
        exameData?.get('medico_id')?.setValue(exame.medico_id);
        exameData?.get('paciente_id')?.setValue(exame.paciente_id);
        exameData?.get('data_exame')?.setValue(exame.data_exame);
        exameData?.get('tipo_exame')?.setValue(exame.tipo_exame);
        exameData?.get('resultado')?.setValue(exame.resultado);
        exameData?.get('prescricao')?.setValue(exame.prescricao);
        exameData?.get('observacoes')?.setValue(exame.observacoes);
      }

    mapForm(): ExameEntity{

        const rawValue = this.form.get('exameData')?.getRawValue();

        const exame: ExameEntity = {
            id: rawValue.id,
            medico_id: rawValue.medico_id,
            paciente_id: rawValue.paciente_id,
            data_exame: rawValue.data_exame,
            tipo_exame: rawValue.tipo_exame,
            resultado: rawValue.resultado,
            prescricao: rawValue.prescricao,
            observacoes: rawValue.observacoes,
        }
        return exame;

    }

    async save(){
        const exame = this.mapForm();
        if(exame.id){
            const sucess = await this.exameService.update(exame);
            if(sucess){
                this.toastComponent.showSuccessCustomMessage('Sucesso!', 'Exame atualizado com sucesso.', 3000);
                this.router.navigate(['/exames']);
            }
        } else {
            await this.exameService.save(exame);
            this.toastComponent.showSuccessCustomMessage('Sucesso!', 'Exame criado com sucesso.', 3000);
            this.router.navigate(['/exames']);
        }

    }


  confirmCancel() {
    if (this.form.pristine) {
      this.router.navigate(['/exames']);
    } else {
      this.confirmModal?.showCancelModal('Deseja mesmo cancelar?', '', true)
        .subscribe(isAccepted => {
          if (isAccepted) {
            this.router.navigate(['/exames']);
          }
        });
    }
  }

}
