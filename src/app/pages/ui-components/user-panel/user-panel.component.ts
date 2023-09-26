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
    name: '',
    addres: '',
    phoneNumber: '',
    email: '',
  };

  constructor(private ApiService: ApiRequestService, private CookieService: CoookieService){}

  editUser(){
    console.log(this.clientInfo);
    this.ApiService.post<any, any>('/api/client/create', this.clientInfo).subscribe(
      response => {
        if (response.success){
          this.getUserInfo();
        }
        console.log(response);
      },
      error => {
        console.error('Error al actualizar información del usuario:', error);
      }
    )
  }

  getUserInfoByToken(){
    console.log(this.CookieService.getToken());
    this.ApiService.getUserByToken<LoginResponse>('/api/account/user', this.CookieService.getToken()).subscribe(
      response => {
        console.log(response);
        if(response.success){
          this.clientInfo.id = response.result.id;
          this.clientInfo.email = response.result.email;
          this.getUserInfo();
        }  
      },
      error => {
        console.error('Error al obtener información del usuario:', error);
      }
    );
  }

  getUserInfo(){
    console.log(this.clientInfo.id);
    this.ApiService.post<any, any>('/api/client/' + this.clientInfo.id, this.clientInfo.id).subscribe(
      response => {
        if(response.success){
          this.clientInfo.id = response.result.id;
          this.clientInfo.email = response.result.email;
          this.clientInfo.addres = response.result.addres;
          this.clientInfo.phoneNumber = response.result.phoneNumber;
          this.clientInfo.name = response.result.name;
        }
        console.log(response);
      }
    )
  }

  updateUser(){
    this.ApiService.put<any, any>('/api/client/update?id='+this.clientInfo.id, this.clientInfo).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  ngOnInit(): void {
    this.getUserInfoByToken();
  }

  onSubmit(form: any){
    if (this.clientInfo.name == "" || this.clientInfo.phoneNumber == "" || this.clientInfo.addres == "") console.error("Error al recopilar datos del usuario");
    this.editUser();
  }


}
