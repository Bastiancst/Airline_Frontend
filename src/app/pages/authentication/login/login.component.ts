import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { LoginResponse } from '../models/login-response';
import { Router } from '@angular/router';
import { CoookieService } from 'src/app/services/cookie.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {

  loginData: LoginRequest = { email: '', password: '' };

  constructor(private apiService: ApiRequestService, private router: Router,
    private CookieService: CoookieService) {}

  onSubmit() 
  {
    console.log('Usuario autenticado:');

    this.apiService.post<LoginResponse, LoginRequest>('/api/account/authenticate', this.loginData).subscribe
        (
            response => {
                console.log('Usuario autenticado:', response);
                if(response.success)
                {
                  this.CookieService.setToken(response.result.jwTtoken);
                  this.router.navigate(['/ui-components/user-panel']);
                }
                
            },
            error => {
                console.error('Error al autenticar:', error);
            }
        );
  }
}
