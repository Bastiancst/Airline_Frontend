// passengers.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { PassengerInfo } from '../buy-passengers/models/passengerInfo';
import { CoookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {
  dataSource: any;
  passengersList: PassengerInfo[] = [];
  passengerModel: PassengerInfo;

  public clientInfo = {
    id: '',
    name: '',
    addres: '',
    phoneNumber: '',
    email: '',
  };

  // Define las columnas que quieres mostrar
  displayedColumns: string[] = ['Name', 'Lastname', 'IdentityDocument', 'SeatNumber', 'viewDetail'];

  constructor(private _router: Router, private ApiService: ApiRequestService, private CookieService: CoookieService) { }

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

  ngOnInit(): void {
    this.ApiService.post<any, any>('', this.clientInfo.id).subscribe(
      response => {
        if(response.success){
          for (let i = 0; i < response.data.length; i++) {
            this.passengerModel = new PassengerInfo(this.CookieService.getToken(), '376B4429-1CE7-4DFF-940E-04A0CD1D3FFC',response.data[i].Name, response.data[i].Lastname, response.data[i].IdentityDocument, response.data[i].Age, response.data[i].Address, response.data[i].PhoneNumber, response.data[i].Email, response.data[i].SeatNumber, response.data[i].IsCopyDocumentEmail);

            this.passengersList.push(this.passengerModel);          
          }
          this.dataSource = [...this.passengersList];
        }

      },
      error => {
        console.log(error);
      }
    )
  }

  viewFlightDetail(flight: any) {
    this._router.navigate(['/ui-components/flight-information'], { queryParams: { flightInfo: JSON.stringify(flight) } });
}

  redirectToAvailable(){
    this._router.navigate(['/ui-components/flights-available']);
  }
}

