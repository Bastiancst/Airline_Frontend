import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { CoookieService } from 'src/app/services/cookie.service';
import { LoginResponse } from '../../authentication/models/login-response';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit{

  public clientInfo = {
    id: '',
    userName: '',
    email: '',
    roles: [],
    isVerified: '',
    jwTtoken: '',
  };

  constructor(private ApiService: ApiRequestService, private CookieService: CoookieService){}

  ngOnInit(): void {
    //falta colocar endpoint
    console.log(this.CookieService.getToken());
    this.ApiService.getUserByToken<LoginResponse>('/api/account', this.CookieService.getToken()).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Error al obtener información del usuario:', error);
      }
    );
  }


}
