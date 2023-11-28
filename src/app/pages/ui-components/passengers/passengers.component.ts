// passengers.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { PassengerInfo } from '../buy-passengers/models/passengerInfo';
import { CoookieService } from 'src/app/services/cookie.service';
import { DataService } from 'src/app/services/data.service';

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
    clientId: '',
    name: '',
    addres: '',
    phoneNumber: '',
    email: '',
  };

  // Define las columnas que quieres mostrar
  displayedColumns: string[] = ['Name', 'Lastname', 'IdentityDocument', 'SeatNumber', 'viewDetail'];

  constructor(private _router: Router, private ApiService: ApiRequestService, private CookieService: CoookieService, private DataService: DataService<PassengerInfo>) { }

  getUserInfoByToken(){
    this.ApiService.getUserByToken<any>('/api/account/user', this.CookieService.getToken()).subscribe(
      response => {
        if(response.success){
          this.clientInfo.clientId = response.result.id;
          this.clientInfo.email = response.result.email;
          console.log(this.clientInfo.clientId);
        }  
      },
      error => {
        console.error('Error al obtener información del usuario:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getUserInfoByToken();
  }

  listPassengers(){
    this.ApiService.post<any, any>('/api/passenger?clientId='+this.clientInfo.clientId+'&flightPlanningId=376B4429-1CE7-4DFF-940E-04A0CD1D3FFC', this.clientInfo.clientId).subscribe(
      response => {
        if(response.success){
          console.log(response);
          for (let i = 0; i < response.result.length; i++) {
            this.passengerModel = new PassengerInfo(this.clientInfo.clientId, '376B4429-1CE7-4DFF-940E-04A0CD1D3FFC', response.result[i].paymentId,response.result[i].name, response.result[i].lastName, response.result[i].identityDocument, response.result[i].age, response.result[i].address, response.result[i].phoneNumber, response.result[i].email, response.result[i].seatNumber, response.result[i].isCopyDocumentEmail);

            this.passengersList.push(this.passengerModel);        
          }
          this.dataSource = [...this.passengersList];
          console.log(this.dataSource);
        }

      },
      error => {
        console.log(error);
      }
    )
  }

  viewFlightDetail(passenger: any) {
    this.DataService.setData(passenger);
    this._router.navigate(['/ui-components/flight-information']);
}

  redirectToAvailable(){
    this._router.navigate(['/ui-components/flights-available']);
  }
}

