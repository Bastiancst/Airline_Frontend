import { Component } from '@angular/core';

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
    Age: '',
    Address: '',
    PhoneNumber: '',
    Email: '',
    SeatNumber: ''
  };
  selectedPassengerCount = '1';  // valor inicial
  passengerCounts = ['1', '2', '3', '4'];  // opciones disponibles
  onSubmit(form: any) {

  }
}