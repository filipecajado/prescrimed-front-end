import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, of } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { ToastComponent } from 'src/app/shared/components/toaster/toast/toast.component';
import { AddressEntity } from 'src/app/shared/domains/address';
import { ClientEntity } from 'src/app/shared/domains/client/client';
import { ClientServiceMock } from 'src/app/shared/mock/services/client.service';
import { brazilianStates } from 'src/app/shared/utils/global-variables';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit{
    @ViewChild('confirmModal') confirmModal: ConfirmModalComponent | undefined;
   
    states: Array<string> = brazilianStates;
   
    readonly masks = {
      phoneMask: '(00) 00000-0000',
      cnpjMask: '00.000.000/0000-00',
      cepMask: '00.000-000',
      srMask: '00.0000.0000.00-00'
    }
  
    constructor(
        private formBuilder: FormBuilder,
        private clientService: ClientServiceMock,
        private router: Router,
        private toastComponent: ToastComponent,
        private route: ActivatedRoute,
        ){


      route.queryParams.pipe(
        map((params) => Number(params['id'])),
        mergeMap(id => id ? this.clientService.findById(id) : of('')),
      ).subscribe((client) => {
        if(client) this.setEditMode(client as ClientEntity);
      });
        }

    form: FormGroup = this.formBuilder.group({
        clientData: this.formBuilder.group({
            id: new FormControl({ value: '', disabled: true }),
            fantasyName: new FormControl(''),
            corporateName: new FormControl('', Validators.required),
            cnpj: new FormControl('', Validators.required),
            segment: new FormControl('', Validators.required),
            priceCost: new FormControl('',),
            phone: new FormControl(''),
            isActive: new FormControl('', Validators.required),     
            stateRegistration: new FormControl('', Validators.required),   
        }),
         address: this.formBuilder.group({
            streetAddress: new FormControl('', Validators.required),
            number: new FormControl('', Validators.required),
            complement: new FormControl(''),
            city: new FormControl('', Validators.required),
            district: new FormControl('', Validators.required),
            uf: new FormControl('', Validators.required),
            cep: new FormControl('', Validators.required),
        })
    });

    
    ngOnInit(): void {

    } 

    setEditMode(client: ClientEntity) {
        const clientData = this.form.get('clientData');
        const address = this.form.get('address');
    
        clientData?.get('id')?.setValue(client.id);
        clientData?.get('fantasyName')?.setValue(client.fantasyName);
        clientData?.get('corporateName')?.setValue(client.corporateName);
        clientData?.get('cnpj')?.setValue(client.cnpj);
        clientData?.get('phone')?.setValue(client.phone);
        clientData?.get('stateRegistration')?.setValue(client.stateRegistration);
        clientData?.get('isActive')?.setValue(client.isActive);
        clientData?.get('segment')?.setValue(client.segment);

        address?.get('cep')?.setValue(client.address?.cep);
        address?.get('city')?.setValue(client.address?.city);
        address?.get('complement')?.setValue(client.address?.complement);
        address?.get('district')?.setValue(client.address?.district);
        address?.get('number')?.setValue(client.address?.number);
        address?.get('streetAddress')?.setValue(client.address?.streetAddress);
        address?.get('uf')?.setValue(client.address?.uf);
      }
        
    mapForm(): ClientEntity{

        const rawValueClient = this.form.get('clientData')?.getRawValue();
        const rawValueAddres = this.form.get('address')?.getRawValue();
        
        
        const address: AddressEntity = {
          cep : rawValueAddres.cep,
          city: rawValueAddres.city,
          complement: rawValueAddres.complement,
          district: rawValueAddres.district,
          number: rawValueAddres.number,
          streetAddress: rawValueAddres.streetAddress,
          uf: rawValueAddres.uf
        }
        
        const client: ClientEntity = {
          id: rawValueClient.id,
          fantasyName: rawValueClient.fantasyName,
          corporateName:rawValueClient.corporateName,
          cnpj: rawValueClient.cnpj,
          phone: rawValueClient.phone,
          stateRegistration: rawValueClient.stateRegistration,
          isActive: rawValueClient.isActive,
          segment: rawValueClient.segment,
          address
        }


        return client;
  
    }

    async save(){
        const client = this.mapForm();
        if(client.id){
            const sucess = await this.clientService.update(client);
            if(sucess){
                this.toastComponent.showSuccessCustomMessage('Sucesso!', 'Client atualizado com sucesso.', 3000);
                this.router.navigate(['/clients']);
            }
        } else {
            await this.clientService.save(client);     
            this.toastComponent.showSuccessCustomMessage('Sucesso!', 'Cliente criado com sucesso.', 3000);
            this.router.navigate(['/clients']);
        }
        
    }

    confirmCancel() {
        if (this.form.pristine) {
          this.router.navigate(['/clients']);
        } else {
          this.confirmModal?.showCancelModal('Deseja mesmo cancelar?', '', true)
            .subscribe(isAccepted => {
              if (isAccepted) {
                this.router.navigate(['/clients']);
              }
            });
        }
      }
}