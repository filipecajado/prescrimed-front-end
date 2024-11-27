import { NgModule } from "@angular/core";
import { LoginComponent } from "./main/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./login-routing-module";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { NewUserComponent } from "./register-user/new-user.component";

@NgModule({
    declarations: [
      LoginComponent , NewUserComponent
    ],
    imports: [
      FormsModule,
      CommonModule,
      LoginRoutingModule,
      //Angular Material  
      MatButtonModule,
      MatCardModule,
      MatIconModule,
      MatInputModule,
      MatCheckboxModule,
      ReactiveFormsModule
    ],
    exports: [LoginComponent],
    providers: [
    ],
  })
  export class LoginModule { }