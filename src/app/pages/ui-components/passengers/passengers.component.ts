// passengers.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {
  flights = [
    { Name: 'Juan', 
      Lastname: 'Perez',
      IdentityDocument: '12.323.257-9',
      SeatNumber: 'B23',
    },
  ];

  // Define las columnas que quieres mostrar
  displayedColumns: string[] = ['Name', 'Lastname', 'IdentityDocument', 'SeatNumber'];

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  redirectToBuy(){
    alert('Redireccionando a comprar');
    this._router.navigate(['/ui-components/buyPassenger']);
  }
}

