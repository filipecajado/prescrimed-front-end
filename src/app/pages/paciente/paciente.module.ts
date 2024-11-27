import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteRoutingModule } from './paciente-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PacienteSearchComponent } from './search/paciente-search.component';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ConfirmModalModule } from "../../shared/components/confirm-modal/confirm-modal.module";
import { TooltipModule } from 'primeng/tooltip';

import { NgxMaskModule } from 'ngx-mask';
import { PacienteComponent } from './paciente/paciente.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
    declarations: [PacienteComponent, PacienteSearchComponent],
    providers: [],
    imports: [
        PacienteRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatSortModule,
        MatFormFieldModule,
        ConfirmModalModule,
        TooltipModule,
        NgxMaskModule.forRoot(),
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [

        ]
})
export class PacienteModule { }
