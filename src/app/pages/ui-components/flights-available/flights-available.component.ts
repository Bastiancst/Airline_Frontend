// flights-available.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights-available',
  templateUrl: './flights-available.component.html',
  styleUrls: ['./flights-available.component.scss']
})
export class FlightsAvailableComponent implements OnInit {
  flightInformation: Flight[];
  allFlights = [
    { Id: '1', 
    OfficeId: 'Buenos Aires',
    OriginAirportId: 'EZE',
    FinalAirportId: 'LIM',
    Startime: '08:45',
    Endtime: '12:30',
    Price: '350'
  },
  { Id: '2', 
    OfficeId: 'Santiago',
    OriginAirportId: 'SCL',
    FinalAirportId: 'BOG',
    Startime: '10:30',
    Endtime: '14:15',
    Price: '275'
  },
  { Id: '3', 
    OfficeId: 'Lima',
    OriginAirportId: 'LIM',
    FinalAirportId: 'MEX',
    Startime: '13:20',
    Endtime: '17:55',
    Price: '430'
  },
  { Id: '4', 
    OfficeId: 'Bogotá',
    OriginAirportId: 'BOG',
    FinalAirportId: 'CUN',
    Startime: '09:15',
    Endtime: '13:40',
    Price: '300'
  },
  { Id: '5', 
    OfficeId: 'Ciudad de México',
    OriginAirportId: 'MEX',
    FinalAirportId: 'GRU',
    Startime: '11:55',
    Endtime: '16:20',
    Price: '520'
  },
  { Id: '6', 
    OfficeId: 'Sao Paulo',
    OriginAirportId: 'GRU',
    FinalAirportId: 'SCL',
    Startime: '15:30',
    Endtime: '19:55',
    Price: '260'
  },
  { Id: '7', 
    OfficeId: 'Lima',
    OriginAirportId: 'LIM',
    FinalAirportId: 'EZE',
    Startime: '18:10',
    Endtime: '21:45',
    Price: '340'
  }
  ];
  uniqueOrigins: string[] = [];
  uniqueDestinations: string[] = [];


  constructor(private _router: Router) {
    this.flightInformation = this.allFlights; // Asigna 'allFlights' a 'flightInformation' aquí en lugar de declararlo como una nueva propiedad.
  }
  // Estas son las cadenas que almacenarán los términos de búsqueda ingresados por el usuario.
  searchTermOrigin: string = '';
  searchTermDestination: string = '';

  // Define las columnas que quieres mostrar en tu tabla.
  secondDisplayedColumns: string[] = ['Id', 'OfficeId', 'OriginAirportId', 'FinalAirportId', 'Startime', 'Endtime', 'Price', 'Select'];

  ngOnInit(): void {
    this.uniqueOrigins = Array.from(new Set(this.allFlights.map(flight => flight.OriginAirportId)));
    this.uniqueDestinations = Array.from(new Set(this.allFlights.map(flight => flight.FinalAirportId)));
    // Inicialización adicional si es necesario.
  }

  seleccionarVuelo(flightSelected: Flight) {
    console.log('Vuelo seleccionado:', flightSelected);
    this._router.navigate(['/ui-components/buyPassenger']);
  }

  // Este método se llama cada vez que el usuario cambia el texto en los campos de búsqueda.
  applyFilter() {
    let filteredFlights: Flight[] = this.allFlights; // Comenzamos con todos los vuelos.
    
    // Si hay un término de búsqueda para el Origen, filtramos los vuelos según este criterio.
    if (this.searchTermOrigin) {
      filteredFlights = filteredFlights.filter(flight =>
        flight.OriginAirportId.toLowerCase().includes(this.searchTermOrigin.toLowerCase())
      );
    }

    // Si hay un término de búsqueda para el Destino, filtramos los vuelos por este criterio también.
    if (this.searchTermDestination) {
      filteredFlights = filteredFlights.filter(flight =>
        flight.FinalAirportId.toLowerCase().includes(this.searchTermDestination.toLowerCase())
      );
    }

    // La información de vuelo que se muestra en la tabla se actualiza para reflejar los resultados filtrados.
    this.flightInformation = filteredFlights;
  }
}

// La interfaz define la estructura de un objeto de tipo "Flight".
interface Flight {
  Id: string;
  OfficeId: string;
  OriginAirportId: string;
  FinalAirportId: string;
  Startime: string;
  Endtime: string;
}
