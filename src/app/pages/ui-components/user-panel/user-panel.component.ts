import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { CoookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit{

  public clientInfo = {
    Id: '',
    Name: '',
    Address: '',
    PhoneNumber: '',
    Email: '',
    EmployeeId: '',
    PaymentId: ''
  };

  constructor(private ApiService: ApiRequestService, private CookieService: CoookieService){}

  ngOnInit(): void {
    //falta colocar endpoint
    this.ApiService.getUserByToken('', this.CookieService.getToken()).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Error al obtener información del usuario:', error);
      }
    );
  }


}
