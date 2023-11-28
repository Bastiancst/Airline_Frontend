import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/register-request';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { RegisterResponse } from '../models/register-response';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})

export class AppSideRegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiRequestService
  ) {}

  public istogglePassword = false;

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls['password'].value;
    const confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null : { notSame: true };
  }

  togglePassword(){
    var pwdInp = document.getElementById("passwordInput");
    var pwdInp2 = document.getElementById("passwordInput2");
    var pwdIco = document.getElementById("passwordIcon");
    if(this.istogglePassword) {
      pwdInp?.setAttribute("type", "password");
      pwdInp2?.setAttribute("type", "password");
      pwdIco?.setAttribute("fontIcon", "visibility");
      this.istogglePassword = !this.istogglePassword;
    }
    else {
      pwdInp?.setAttribute("type", "text");
      pwdInp2?.setAttribute("type", "text");
      pwdIco?.setAttribute("fontIcon", "visibility_off");
      this.istogglePassword = !this.istogglePassword;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const registerData = this.form.value;
      console.log('Usuario registrado:', registerData);
      this.apiService.post<RegisterResponse, RegisterRequest>('/api/account/register', registerData).subscribe
      (
          response => {
              console.log('Usuario autenticado:', response);
              if(response.success)
              {
                this.router.navigate(['/authentication/email-verified']);
              }
              
          },
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  redirectToHome() : void{
    this.router.navigate(['/dashboard']);
  }
}