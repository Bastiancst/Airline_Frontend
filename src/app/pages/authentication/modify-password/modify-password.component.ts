import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { ModifyPasswordRequest } from '../models/modifypassword-request';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { Router } from '@angular/router';
import { VerifyCodeResponse } from '../models/verifycode-response';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.scss']
})
export class ModifyPasswordComponent implements OnInit {
  data: { email: string; code: string } | null = null;
  passwordForm: FormGroup;  

  modify : ModifyPasswordRequest = {email: '', code: '', password: '', confirmPassword: ''}

  constructor(
    private dataService: DataService<{ email: string; code: string }>,
    private fb: FormBuilder,  
    private snackBar: MatSnackBar,
    private apiService: ApiRequestService,
    private router: Router
  ) {
    this.passwordForm = this.fb.group({  
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {validator: this.checkPasswords });
  }

  ngOnInit(): void {
    this.dataService.data$.subscribe(data => {
      this.data = data;
      console.log(this.data); 
    });
  }

  checkPasswords(group: FormGroup) { 
    const passControl = group.get('password');
    const confirmPassControl = group.get('confirmPassword');
    if (passControl && confirmPassControl) {
      const pass = passControl.value;
      const confirmPass = confirmPassControl.value;
      return pass === confirmPass ? null : { notSame: true };     
    }
    return { notSame: true };  
  }

  onSubmit() {  
    if (this.passwordForm.valid) {
      
      this.modify.email = this.data?.email ?? "";
      this.modify.code = this.data?.code ?? "";
      this.modify.password = this.passwordForm.get('password')?.value ?? "";
      this.modify.confirmPassword = this.passwordForm.get('confirmPassword')?.value ?? "";

      this.apiService.post<VerifyCodeResponse, ModifyPasswordRequest>('/api/account/resetpassword', this.modify).subscribe(
        response => {
          if(response.success) {
            this.snackBar.open('The password was changed successfully', '', {
              duration: 3000,
            });
            this.router.navigate(['/authentication/login']);
          } else {
            this.snackBar.open('Error: Password reset failed. Please try again.', '', {
              duration: 3000,
            });
            this.router.navigate(['/authentication/forgot-password']);
          }
        },
        error => {
          console.error('Error:', error);
          this.snackBar.open('Error: Password reset failed. Please try again.', '', {
            duration: 3000,
          });
          this.router.navigate(['/authentication/forgot-password']);
        }
      );
    } else {
      this.snackBar.open('Error: Passwords do not match or are empty.', '', {
        duration: 3000,
      });
    }
  }

  get passwordControl() {
    return this.passwordForm.get('password');
  }
  
  get confirmPasswordControl() {
    return this.passwordForm.get('confirmPassword');
  }
}
