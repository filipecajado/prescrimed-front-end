import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, of } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { ToastComponent } from 'src/app/shared/components/toaster/toast/toast.component';
import { ConsultaEntity } from 'src/app/shared/domains/consulta';
import { ConsultaServiceMock } from 'src/app/shared/mock/services/consulta.service';
import { MedicoServiceMock } from 'src/app/shared/mock/services/medico.service';
import { PacienteServiceMock } from 'src/app/shared/mock/services/paciente.service';



import { types, units } from 'src/app/shared/utils/global-variables';

@Component({
    selector: 'app-consulta',
    templateUrl: './consulta.component.html',
    styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit{
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
        private consultaService: ConsultaServiceMock,
        private medicoService: MedicoServiceMock,
        private pacientService: PacienteServiceMock,
        private router: Router,
        private toastComponent: ToastComponent,
        private route: ActivatedRoute,
        ){


      route.queryParams.pipe(
        map((params) => Number(params['id'])),
        mergeMap(id => id ? this.consultaService.findById(id) : of('')),
      ).subscribe((consulta) => {
        if(consulta) this.setEditMode(consulta as ConsultaEntity);
      });
        }

    form: FormGroup = this.formBuilder.group({
        consultaData: this.formBuilder.group({
            id: new FormControl({ value: '', disabled: true }),
            medico_id: new FormControl(Validators.required),
            paciente_id: new FormControl(Validators.required),
            data_consulta: new FormControl('', Validators.required),
            motivo_consulta: new FormControl(''),
            diagnostico: new FormControl(''),
            prescricao: new FormControl('', Validators.required),

        })
    });


    async ngOnInit(): Promise<void> {
      this.medicos = await this.medicoService.getAll();
      this.pacientes = await this.pacientService.getAll();
    }

    setEditMode(consulta: ConsultaEntity) {
        const consultaData = this.form.get('consultaData');

        consultaData?.get('id')?.setValue(consulta.id);
        consultaData?.get('medico_id')?.setValue(consulta.medico_id);
        consultaData?.get('paciente_id')?.setValue(consulta.paciente_id);
        consultaData?.get('data_consulta')?.setValue(consulta.data_consulta);
        consultaData?.get('motivo_consulta')?.setValue(consulta.motivo_consulta);
        consultaData?.get('diagnostico')?.setValue(consulta.diagnostico);
        consultaData?.get('prescricao')?.setValue(consulta.prescricao);

      }

    mapForm(): ConsultaEntity{

        const rawValue = this.form.get('consultaData')?.getRawValue();

        const consulta: ConsultaEntity = {
            id: rawValue.id,
            medico_id: rawValue.medico_id,
            paciente_id: rawValue.paciente_id,
            data_consulta: rawValue.data_consulta,
            motivo_consulta: rawValue.motivo_consulta,
            diagnostico: rawValue.diagnostico,
            prescricao: rawValue.prescricao,
        }
        return consulta;

    }

    async save(){
        const consulta = this.mapForm();
        if(consulta.id){
            const sucess = await this.consultaService.update(consulta);
            if(sucess){
                this.toastComponent.showSuccessCustomMessage('Sucesso!', 'Consulta atualizado com sucesso.', 3000);
                this.router.navigate(['/consultas']);
            }
        } else {
            await this.consultaService.save(consulta);
            this.toastComponent.showSuccessCustomMessage('Sucesso!', 'Consulta criado com sucesso.', 3000);
            this.router.navigate(['/consultas']);
        }

    }


  confirmCancel() {
    if (this.form.pristine) {
      this.router.navigate(['/consultas']);
    } else {
      this.confirmModal?.showCancelModal('Deseja mesmo cancelar?', '', true)
        .subscribe(isAccepted => {
          if (isAccepted) {
            this.router.navigate(['/consultas']);
          }
        });
    }
  }

}
