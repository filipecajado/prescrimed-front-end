
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastComponent } from 'src/app/shared/components/toaster/toast/toast.component';
import { UserEntity } from 'src/app/shared/domains/user/user';
import { UserServiceMock } from 'src/app/shared/mock/services/user.service';


@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
   
    hideConfirmPassword = true;
    hidePassword = true;
    passwordInvalid = true;


    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private toastComponent: ToastComponent,
        private userService: UserServiceMock) { }

    form: FormGroup = this.formBuilder.group({
        id: new FormControl({ value: '', disabled: true }),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
    });

    ngOnInit(): void {
    }

    mapForm(): UserEntity {

        const rawValue = this.form?.getRawValue();
        const user: UserEntity = {
            id: rawValue.id,
            email: rawValue.email,
            password: rawValue.password,
            confirmPassword: rawValue.password
        }
        return user;
    }


    async save() {
        if(this.form.valid){
            const user = this.mapForm();
            console.log(user)
            await this.userService.save(user);
            this.toastComponent.showSuccessCustomMessage('Sucesso!', 'Usuário criado com sucesso.', 3000);
            this.router.navigate(['/login']);
        }
    
    }

}