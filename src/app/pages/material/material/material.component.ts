import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, of } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { ToastComponent } from 'src/app/shared/components/toaster/toast/toast.component';
import { MaterialEntity } from 'src/app/shared/domains/material/material';
import { MaterialServiceMock } from 'src/app/shared/mock/services/material.service';
import { types, units } from 'src/app/shared/utils/global-variables';

@Component({
    selector: 'app-material',
    templateUrl: './material.component.html',
    styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit{
    @ViewChild('confirmModal') confirmModal: ConfirmModalComponent | undefined;

    types = types;
    units = units;
    
    constructor(
        private formBuilder: FormBuilder,
        private materialService: MaterialServiceMock,
        private router: Router,
        private toastComponent: ToastComponent,
        private route: ActivatedRoute,
        ){


      route.queryParams.pipe(
        map((params) => Number(params['id'])),
        mergeMap(id => id ? this.materialService.findById(id) : of('')),
      ).subscribe((material) => {
        if(material) this.setEditMode(material as MaterialEntity);
      });
        }

    form: FormGroup = this.formBuilder.group({
        materialData: this.formBuilder.group({
            id: new FormControl({ value: '', disabled: true }),
            name: new FormControl(''),
            type: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            unit: new FormControl('', Validators.required),
            priceCost: new FormControl('',),
            priceExecution: new FormControl(''),
            quantity: new FormControl('',[Validators.required, Validators.pattern('[0-9]+')]),
            provider: new FormControl('', Validators.required),
            provideId: new FormControl('', ),
        })
    });

    
    ngOnInit(): void {

    } 

    setEditMode(material: MaterialEntity) {
        const materialData = this.form.get('materialData');
    
        materialData?.get('id')?.setValue(material.id);
        materialData?.get('name')?.setValue(material.name);
        materialData?.get('type')?.setValue(material.type);
        materialData?.get('description')?.setValue(material.description);
        materialData?.get('unit')?.setValue(material.unit);
        materialData?.get('priceCost')?.setValue(material.priceCost);
        materialData?.get('priceExecution')?.setValue(material.priceExecution);
        materialData?.get('quantity')?.setValue(material.quantity);
        materialData?.get('provider')?.setValue(material.provider);

      }
        
    mapForm(): MaterialEntity{

        const rawValue = this.form.get('materialData')?.getRawValue();

        const material: MaterialEntity = {
            id: rawValue.id,
            name: rawValue.name,
            type: rawValue.type,
            description: rawValue.description,
            unit: rawValue.unit,
            priceCost: rawValue.priceCost,
            priceExecution: rawValue.priceExecution,
            quantity: rawValue.quantity,
            provider: rawValue.provider,
            providerId: rawValue.providerId,
        }
        return material;
  
    }

    async save(){
        const material = this.mapForm();
        if(material.id){
            const sucess = await this.materialService.update(material);
            if(sucess){
                this.toastComponent.showSuccessCustomMessage('Sucesso!', 'Material atualizado com sucesso.', 3000);
                this.router.navigate(['/material']);
            }
        } else {
            await this.materialService.save(material);     
            this.toastComponent.showSuccessCustomMessage('Sucesso!', 'Material criado com sucesso.', 3000);
            this.router.navigate(['/material']);
        }
        
    }


  confirmCancel() {
    if (this.form.pristine) {
      this.router.navigate(['/material']);
    } else {
      this.confirmModal?.showCancelModal('Deseja mesmo cancelar?', '', true)
        .subscribe(isAccepted => {
          if (isAccepted) {
            this.router.navigate(['/material']);
          }
        });
    }
  }

}