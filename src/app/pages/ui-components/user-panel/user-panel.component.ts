import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { CoookieService } from 'src/app/services/cookie.service';
import { LoginResponse } from '../../authentication/models/login-response';
import { DataService } from 'src/app/services/data.service';
import { Invoices } from '../user-panel/models/invoices';
import { MatSelect } from '@angular/material/select';


interface Response {
  success: boolean;
  message: string;
  errors: any;
  result: {
    name: string;
    lastName: string;
    email: string;
  }
}
@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit{
  dataSource: any;
  InvoicesModel: Invoices;
  data: any[] = [];

  public clientInfo = {
    id: '',
    name: '',
    addres: '',
    phoneNumber: '',
    email: '',
  };


  public invoices : Invoices[] = [];

  public employee: {
    name: string;
    lastName: string;
    email: string;
  } = { name: '', lastName: '', email: '' };


  displayedColumns: string[] = ['Id', 'Amount', 'Date', 'viewDetail'];

  public changeStatus = "";
  public updatedInfo: boolean = false;
  selectedCountryCode: string;

  constructor(private ApiRequestService: ApiRequestService, private _router: Router, private DataService: DataService<any>, private ApiService: ApiRequestService, private CookieService: CoookieService){}

  limitLength(event: any) {
    const maxLength = 10;
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
    }
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

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
        this.listInvoices();
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

    this.ApiRequestService.post<Response, null>(`/api/client/employee?id=83811B9A-C9E6-45ED-BB0E-0EB114DDE329`, null).subscribe
    (
      response => {
        console.log(response)
        if (response.success) {

          console.log(response)
          this.employee = response.result
        } else {
          console.log('Error al recibir empleado')
        }
      }

    );
  }

  onSubmit(form: any){
    /*
    if (this.clientInfo.name == "" || this.clientInfo.phoneNumber == "" || this.clientInfo.addres == "") console.error("Error al recopilar datos del usuario");
    */

    this.getUserInfo(this.clientInfo.id);

    if(!this.updatedInfo) this.createUserInfo();
    else if (this.updatedInfo) this.updateUser();

  }
  viewInvoiceDetail() {
    this.InvoicesModel = new Invoices('1', '10', '10/1/23', '12');
    this.data.push(this.clientInfo);
    this.data.push(this.InvoicesModel);
    console.log(this.InvoicesModel)
    this.DataService.setData(this.data);
    this._router.navigate(['/ui-components/invoices']);
}

  listInvoices(){
    this.InvoicesModel = new Invoices('1', '10', '10/1/23', '12');
    this.invoices.push(this.InvoicesModel);
    console.log(this.invoices);
    this.dataSource = [...this.invoices];
  }

  redirectToInvoices(){
    this._router.navigate(['/ui-components/invoices']);
  }

}
