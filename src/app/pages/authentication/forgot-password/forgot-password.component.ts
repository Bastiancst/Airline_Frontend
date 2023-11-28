import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { DataService } from 'src/app/services/data.service';
import { ForgotResponse } from '../models/forgot-response';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService<string>,
    private router: Router,
    private apiService: ApiRequestService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.value.email;
      this.dataService.setData(email);

      this.apiService.post<ForgotResponse, null>(`/api/account/recoverycode?email=${email}`, null).subscribe
      (
          response => {
              console.log(response);
              if(response.success)
              {
                this.router.navigate(['/authentication/verify-code']);
              }
              
          },
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
