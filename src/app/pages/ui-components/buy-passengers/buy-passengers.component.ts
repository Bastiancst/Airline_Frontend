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

  onSubmit(form: any) {

  }
}
