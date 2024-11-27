import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, of } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { ToastComponent } from 'src/app/shared/components/toaster/toast/toast.component';
import { PacienteEntity } from 'src/app/shared/domains/paciente';
import { PacienteServiceMock } from 'src/app/shared/mock/services/paciente.service';



import { types, units } from 'src/app/shared/utils/global-variables';

@Component({
    selector: 'app-paciente',
    templateUrl: './paciente.component.html',
    styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit{
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
        private pacienteService: PacienteServiceMock,
        private router: Router,
        private toastComponent: ToastComponent,
        private route: ActivatedRoute,
        ){


      route.queryParams.pipe(
        map((params) => Number(params['id'])),
        mergeMap(id => id ? this.pacienteService.findById(id) : of('')),
      ).subscribe((paciente) => {
        if(paciente) this.setEditMode(paciente as PacienteEntity);
      });
        }

    form: FormGroup = this.formBuilder.group({
        pacienteData: this.formBuilder.group({
            id: new FormControl({ value: '', disabled: true }),
            nome: new FormControl(''),
            data_nascimento: new FormControl('', Validators.required),
            historico_medico: new FormControl('', Validators.required),
            telefone: new FormControl('', Validators.required),
            cpf: new FormControl('', Validators.required),
        })
    });


    ngOnInit(): void {
    }

    setEditMode(paciente: PacienteEntity) {
        const pacienteData = this.form.get('pacienteData');

        pacienteData?.get('id')?.setValue(paciente.id);
        pacienteData?.get('nome')?.setValue(paciente.nome);
        pacienteData?.get('data_nascimento')?.setValue(paciente.data_nascimento);
        pacienteData?.get('telefone')?.setValue(paciente.telefone);
        pacienteData?.get('historico_medico')?.setValue(paciente.historico_medico);
        pacienteData?.get('cpf')?.setValue(paciente.cpf);


      }

    mapForm(): PacienteEntity{

        const rawValue = this.form.get('pacienteData')?.getRawValue();

        const paciente: PacienteEntity = {
            id: rawValue.id,
            nome: rawValue.nome,
            data_nascimento: rawValue.especializacao,
            telefone: rawValue.telefone,
            historico_medico: rawValue.historico_medico,
            cpf: rawValue.cpf,
        }
        return paciente;

    }

    async save(){
        const paciente = this.mapForm();
        if(paciente.id){
            const sucess = await this.pacienteService.update(paciente);
            if(sucess){
                this.toastComponent.showSuccessCustomMessage('Sucesso!', 'Paciente atualizado com sucesso.', 3000);
                this.router.navigate(['/pacientes']);
            }
        } else {
            paciente.id = Math.floor(Math.random() * 1000000).toString()
            await this.pacienteService.save(paciente);
            this.toastComponent.showSuccessCustomMessage('Sucesso!', 'Paciente criado com sucesso.', 3000);
            this.router.navigate(['/pacientes']);
        }

    }


  confirmCancel() {
    if (this.form.pristine) {
      this.router.navigate(['/pacientes']);
    } else {
      this.confirmModal?.showCancelModal('Deseja mesmo cancelar?', '', true)
        .subscribe(isAccepted => {
          if (isAccepted) {
            this.router.navigate(['/pacientes']);
          }
        });
    }
  }

}
