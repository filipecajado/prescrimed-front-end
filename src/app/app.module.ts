import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule  } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './shared/utils/custom-language-paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialServiceMock } from './shared/mock/services/material.service';
import { HttpClientModule } from '@angular/common/http';
import { ToasterModule } from 'src/app/shared/components/toaster/toast/toast.module';
import { MatSortModule } from '@angular/material/sort';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from './pages/material/material.module';
import { LoginModule } from './pages/login/login.module';
import { AuthServiceMock } from './shared/mock/services/auth.service';
import { MedicoModule } from './pages/medico/medico.module';
import { MedicoServiceMock } from './shared/mock/services/medico.service';
import { PacienteModule } from './pages/paciente/paciente.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatListModule,
    MatExpansionModule,
    MatSidenavModule,
    MatSortModule,
    ToasterModule,
    DialogModule,
    MaterialModule,
    LoginModule,
    MedicoModule,
    PacienteModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
    { provide: MaterialServiceMock},
    { provide: MedicoServiceMock},
    { provide: AuthServiceMock },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
