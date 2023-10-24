import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flights-available',
  templateUrl: './flights-available.component.html',
  styleUrls: ['./flights-available.component.scss']
})

export class FlightsAvailableComponent implements OnInit{
  flightInformation = [
    { Id: '1', 
      OfficeId: 'Buenos Aires',
      OriginAirportId: 'EZE',
      FinalAirportId: 'LIM',
      Startime: '08:45',
      Endtime: '12:30'
    },
    { Id: '2', 
      OfficeId: 'Santiago',
      OriginAirportId: 'SCL',
      FinalAirportId: 'BOG',
      Startime: '10:30',
      Endtime: '14:15'
    },
    { Id: '3', 
      OfficeId: 'Lima',
      OriginAirportId: 'LIM',
      FinalAirportId: 'MEX',
      Startime: '13:20',
      Endtime: '17:55'
    },
    { Id: '4', 
      OfficeId: 'Bogotá',
      OriginAirportId: 'BOG',
      FinalAirportId: 'CUN',
      Startime: '09:15',
      Endtime: '13:40'
    },
    { Id: '5', 
      OfficeId: 'Ciudad de México',
      OriginAirportId: 'MEX',
      FinalAirportId: 'GRU',
      Startime: '11:55',
      Endtime: '16:20'
    },
    { Id: '6', 
      OfficeId: 'Sao Paulo',
      OriginAirportId: 'GRU',
      FinalAirportId: 'SCL',
      Startime: '15:30',
      Endtime: '19:55'
    },
    { Id: '7', 
      OfficeId: 'Lima',
      OriginAirportId: 'LIM',
      FinalAirportId: 'EZE',
      Startime: '18:10',
      Endtime: '21:45'
    }
  ];
  

  secondDisplayedColumns: string[] = ['Id', 'OfficeId', 'OriginAirportId', 'FinalAirportId', 'Startime', 'Endtime', 'Select'];
  ngOnInit(): void {
  }

  seleccionarVuelo(flightSelected: Flight) {
    console.log('Vuelo seleccionado:', flightSelected);
  }
}
interface Flight {
  Id: string;
  OfficeId: string;
  OriginAirportId: string;
  FinalAirportId: string;
  Startime: string;
  Endtime: string;
}