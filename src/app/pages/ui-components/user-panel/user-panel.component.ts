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

  public changeStatus = "";
  public updatedInfo: boolean = false;

  constructor(private ApiService: ApiRequestService, private CookieService: CoookieService){}

  createUserInfo(){
    console.log(this.clientInfo);
    this.ApiService.post<any, any>('/api/client/create', this.clientInfo).subscribe(
      response => {
        if (response.success){
          this.changeStatus = "La información se ha guardado correctamente";
          this.updatedInfo = true;
        }
      },
      error => {
        console.error('Error al actualizar información del usuario:', error);
      }
    )
  }

  getUserInfoByToken(){
    this.ApiService.getUserByToken<LoginResponse>('/api/account/user', this.CookieService.getToken()).subscribe(
      response => {
        if(response.success){
          this.clientInfo.id = response.result.id;
          this.clientInfo.email = response.result.email;
          this.getUserInfo(response.result.id);
        }  
      },
      error => {
        console.error('Error al obtener información del usuario:', error);
      }
    );
  }

  getUserInfo(id: string){
    this.ApiService.post<any, any>('/api/client/' + id, this.clientInfo.id).subscribe(
      response => {
        if(response.success){
          this.clientInfo.id = response.result.id;
          this.clientInfo.email = response.result.email;
          this.clientInfo.addres = response.result.addres;
          this.clientInfo.phoneNumber = response.result.phoneNumber;
          this.clientInfo.name = response.result.name;
          this.updatedInfo = true;
        }
      },
      error => { 
        this.updatedInfo = false;
        console.error("error getUserInfo: ", error);
      }
    )
  }

  updateUser(){
    this.ApiService.put<any, any>('/api/client/update?id='+this.clientInfo.id, this.clientInfo).subscribe(
      response => {
        if (response.success) {
          this.changeStatus = "La información se ha actualizado correctamente";
          this.getUserInfo(this.clientInfo.id);
        }
      },
      error => {
        console.error("Error al actualizar info usuario: ", error);
      }
    );
  }

  ngOnInit(): void {
    this.getUserInfoByToken();
  }

  onSubmit(form: any){
    /*
    if (this.clientInfo.name == "" || this.clientInfo.phoneNumber == "" || this.clientInfo.addres == "") console.error("Error al recopilar datos del usuario");
    */

    this.getUserInfo(this.clientInfo.id);

    if(!this.updatedInfo) this.createUserInfo();
    else if (this.updatedInfo) this.updateUser();

  }


}
