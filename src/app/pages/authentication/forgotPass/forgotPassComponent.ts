import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { LoginResponse } from '../models/login-response';
import { Router } from '@angular/router';



@Component({
    selector: 'app-login',
    templateUrl: './forgotPass.component.html',
    styleUrls: ['./forgotPass.component.scss']
})
export class forgotPassComponent {

    loginData: LoginRequest = { email: '', password: '' };

    constructor(private apiService: ApiRequestService, private router: Router) { }

    onSubmit() {
        console.log('Usuario autenticado:');

        this.apiService.post<LoginResponse, LoginRequest>('/api/account/authenticate', this.loginData).subscribe(
            response => {
                console.log('Usuario autenticado:', response);
                if (response.success) {
                    this.router.navigate(['/dashboard']);
                }

            },
            error => {
                console.error('Error al autenticar:', error);
            }
        );
    }
}
