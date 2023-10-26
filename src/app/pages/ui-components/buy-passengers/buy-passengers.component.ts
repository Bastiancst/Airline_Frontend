import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { CoookieService } from 'src/app/services/cookie.service';
import { PassengerInfo } from './models/passengerInfo';

@Component({
  selector: 'app-buy-passengers',
  templateUrl: './buy-passengers.component.html',
  styleUrls: ['./buy-passengers.component.scss']
})
export class BuyPassengersComponent {
  public passengerInfo = {
    Name: '',
    Lastname: '',
    IdentityDocument: '',
    Age: 0,
    Address: '',
    PhoneNumber: '',
    Email: '',
    SeatNumber: ''
  };

  public clientInfo = {
    id: '',
    name: '',
    addres: '',
    phoneNumber: '',
    email: '',
  };

  dataSource: any;
  passengersCart: PassengerInfo[] = [];
  passengerModel: PassengerInfo;
  totalPrice: number;

  displayedColumns: string[] = ['Name', 'Lastname', 'IdentityDocument', 'Age', 'Address', 'PhoneNumber', 'Email', 'SeatNumber'];

  constructor(private ApiService: ApiRequestService, private CookieService: CoookieService, private _router: Router){
    this.totalPrice = 0;
  }

  getUserInfoByToken(){
    this.ApiService.getUserByToken<any>('/api/account/user', this.CookieService.getToken()).subscribe(
      response => {
        if(response.success){
          this.clientInfo.id = response.result.id;
          this.clientInfo.email = response.result.email;
        }  
      },
      error => {
        console.error('Error al obtener información del usuario:', error);
      }
    );
  }

  buyPassengers(){
    console.log(this.passengersCart);
    this.ApiService.post<any, any>('' + this.clientInfo.id, this.passengerInfo).subscribe(
      response =>{
        if(response.success){
          this._router.navigate(['/ui-components/passengers']);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  onSubmit(form: any) {
    this.passengerModel = new PassengerInfo(this.passengerInfo.Name, this.passengerInfo.Lastname, this.passengerInfo.IdentityDocument, this.passengerInfo.Age, this.passengerInfo.Address, this.passengerInfo.PhoneNumber, this.passengerInfo.Email, this.passengerInfo.SeatNumber, true);

    this.totalPrice = this.totalPrice + 1000;

    form.reset();

    this.passengersCart.push(this.passengerModel);
    this.dataSource = [...this.passengersCart];
  }
}