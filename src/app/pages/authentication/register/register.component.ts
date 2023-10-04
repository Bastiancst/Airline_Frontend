import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { RegisterRequest } from './models/register-request';
import { RegisterResponse } from './models/register-response';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {

  registerData: RegisterRequest = { email: '', password: '' , confirmPassword:''};

  constructor(private router: Router, private apiService: ApiRequestService) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
  {
    console.log('Usuario registrado:');

    this.apiService.post<RegisterResponse, RegisterRequest>('/api/account/register', this.registerData).subscribe
        (
            response => {
                console.log('Usuario regitrado:', response);
                if(response.success)
                {
                  
                }
                
            },
            error => {
                
                console.error('Error al autenticar:', error);
            }
        );
  }
  }
}
