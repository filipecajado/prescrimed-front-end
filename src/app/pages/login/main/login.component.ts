import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastComponent } from 'src/app/shared/components/toaster/toast/toast.component';
import { AuthServiceMock } from 'src/app/shared/mock/services/auth.service';
import { PlatformDetectorService } from 'src/app/shared/utils/plataform-detector/plataform-detector.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('emailInput') emailInput!: ElementRef;
  form!: FormGroup;
  hidePassword: boolean = true;
  passwordInvalid: boolean = true;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastComponent: ToastComponent,
    private authService: AuthServiceMock,
    private platformDetectorService: PlatformDetectorService) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      keepConnected: [false, Validators.required]
    });
  }

  // login() {

  //   const email = this.form.get('email')?.value;
  //   const password = this.form.get('password')?.value;

  //   this.authService
  //     .authenticate(email, password)
  //     .subscribe(
  //       () => {
  //         this.router.navigateByUrl("/home")
  //       },
  //       err => {
  //         console.log(err);
  //         this.form.reset();
  //         this.platformDetectorService.isPlatformBrowser() &&
  //           this.emailInput.nativeElement.focus();
  //         this.toastComponent.showErrorCustomMessage('Oops!', 'Email ou senha inválidos. Verifique suas credenciais e tente novamente.');
  //         this.passwordInvalid = true;
  //       }
  //     );
  // }


  login() {
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    this.authService.authenticate(email, password).subscribe(
      isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigateByUrl("/home");
        } else {
          this.form.reset();
          this.platformDetectorService.isPlatformBrowser() && this.emailInput.nativeElement.focus();
          this.toastComponent.showErrorCustomMessage('Oops!', 'Email ou senha inválidos. Verifique suas credenciais e tente novamente.');
          this.passwordInvalid = true;
          this.router.navigateByUrl("/home");
        }
      },
      error => {
        console.log(error);
        // Lidar com erros ocorridos durante a chamada HTTP
      }
    );
  }

}

