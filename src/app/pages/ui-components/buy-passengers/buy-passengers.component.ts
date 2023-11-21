import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { CoookieService } from 'src/app/services/cookie.service';
import { PassengerInfo } from './models/passengerInfo';
import { PaymentInfo } from './models/paymentInfo';
import { DataService } from 'src/app/services/data.service';
import { PaymentResponse } from './models/paymentResponse';

@Component({
  selector: 'app-buy-passengers',
  templateUrl: './buy-passengers.component.html',
  styleUrls: ['./buy-passengers.component.scss']
})
export class BuyPassengersComponent implements OnInit{
  public passengerInfo = {
    clientId: '',
    flightPlanningId: '376B4429-1CE7-4DFF-940E-04A0CD1D3FFC',
    name: '',
    lastName: '',
    identityDocument: '',
    age: 0,
    address: '',
    phoneNumber: '',
    email: '',
    seatNumber: 0
  };

  public clientInfo = {
    clientId: '',
    name: '',
    addres: '',
    phoneNumber: '',
    email: '',
  };

  dataSource: any;
  passengersCart: PassengerInfo[] = [];
  passengerModel: PassengerInfo;
  paymentInfo: PaymentInfo;
  paymentResponse: PaymentResponse;
  totalPrice: number;

  displayedColumns: string[] = ['Name', 'Lastname', 'IdentityDocument', 'Age', 'Address', 'PhoneNumber', 'Email', 'SeatNumber'];

  constructor(private ApiService: ApiRequestService, private CookieService: CoookieService, private _router: Router, private dataService: DataService<PaymentResponse>){
    this.totalPrice = 0;
  }

  limitLength(event: any, limit: number) {
    const maxLength = limit;
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

  
  ngOnInit(): void {
    this.getUserInfoByToken();
  }

  getUserInfoByToken(){
    this.ApiService.getUserByToken<any>('/api/account/user', this.CookieService.getToken()).subscribe(
      response => {
        if(response.success){
          this.clientInfo.clientId = response.result.id;
          this.clientInfo.email = response.result.email;
          console.log(response.result.id);
          console.log(this.clientInfo.clientId);
        }  
      },
      error => {
        console.error('Error al obtener información del usuario:', error);
      }
    );
  }

  toWebpay(){
    this.paymentInfo = new PaymentInfo(this.totalPrice, this.clientInfo.clientId);
    this.ApiService.post<any, any>('/api/transaction?amount='+this.totalPrice+'&clientId='+this.clientInfo.clientId, this.paymentInfo).subscribe(
      response => {
        this.paymentResponse = new PaymentResponse(response.result.token, response.result.url);
        console.log(this.paymentResponse);
        this.dataService.setData(this.paymentResponse);
        this._router.navigate(['/ui-components/redirect-webpay']);
      },
      error => {
        console.error(error);
      }
    )
  }

  /*buyPassengers(){
    console.log(this.passengersCart);
    this.ApiService.post<any, any>('/api/passenger/create', this.passengersCart).subscribe(
      response =>{
        if(response.success){
          this._router.navigate(['/ui-components/passengers']);
        }
      },
      error => {
        console.log(error);
      }
    )
  }*/

  onSubmit(form: any) {
    this.passengerModel = new PassengerInfo(this.clientInfo.clientId, this.passengerInfo.flightPlanningId, this.passengerInfo.name, this.passengerInfo.lastName, this.passengerInfo.identityDocument, this.passengerInfo.age, this.passengerInfo.address, this.passengerInfo.phoneNumber, this.passengerInfo.email, this.passengerInfo.seatNumber, true);
    this.totalPrice = this.totalPrice + 1000;
    console.log(this.passengerModel);

    form.reset();

    this.passengersCart.push(this.passengerModel);
    this.dataSource = [...this.passengersCart];
  }
}