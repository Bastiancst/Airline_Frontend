import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fligth-information',
  templateUrl: './fligth-information.component.html',
  styleUrls: ['./fligth-information.component.scss']
})
export class FligthInformationComponent implements OnInit{
  flightInformation = [
    { Id: '1', 
    OfficeId: 'Santiago',
    OriginAirportId: 'SCL',
    FinalAirportId: 'NYC',
    Startime: '13:10',
    Endtime: '23:37'
    },
  ];

  flights = [
    { Name: 'Juan', 
      Lastname: 'Perez',
      IdentityDocument: '12.323.257-9',
      SeatNumber: 'B23',
    },
  ];

  // Define las columnas que quieres mostrar
  firstDisplayedColumns: string[] = ['Name','Lastname','IdentityDocument','SeatNumber']
  secondDisplayedColumns: string[] = ['Id', 'OfficeId', 'OriginAirportId', 'FinalAirportId', 'Startime', 'Endtime'];
  ngOnInit(): void {
  }
}
