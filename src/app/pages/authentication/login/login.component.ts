import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { LoginResponse } from '../models/login-response';
import { Router } from '@angular/router';
import { CoookieService } from 'src/app/services/cookie.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {

  loginData: LoginRequest = { email: '', password: '' };
  public loginStatus = "";

  constructor(private apiService: ApiRequestService, private router: Router,
    private CookieService: CoookieService) {}

  onSubmit() 
  {
    console.log('Usuario autenticado:');
    this.loginStatus = "";
    this.apiService.post<LoginResponse, LoginRequest>('/api/account/authenticate', this.loginData).subscribe
        (
            response => {
                console.log('Usuario autenticado:', response);
                if(response.success)
                {
                  this.CookieService.setToken(response.result.jwTtoken);
                  this.CookieService.setRole(response.result.roles);
                  this.router.navigate(['/ui-components/user-panel']);
                }
                
            },
            error => {
                this.loginStatus = "Invalid Credentials";
                if(!this.loginData.email.includes('@')) this.loginStatus += " / Enter a valid email";
                else if(this.loginData.password.length == 0) this.loginStatus += " / Enter your password";
                console.error('Error al autenticar:', error);
            }
        );
  }

  redirectToHome() : void{
    this.router.navigate(['/dashboard']);
  }
}
