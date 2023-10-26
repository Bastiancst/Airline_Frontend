import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EditPassengerComponent } from '../edit-passenger/edit-passenger.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { CoreService } from '../../core/core.service';
@Component({
  selector: 'app-fligth-information',
  templateUrl: './fligth-information.component.html',
  styleUrls: ['./fligth-information.component.scss']
})
export class FligthInformationComponent implements OnInit{
  flightInformation = [
    { Id: '1', 
    OfficeId: 'Buenos Aires',
    OriginAirportId: 'EZE',
    FinalAirportId: 'LIM',
    Startime: '08:45',
    Endtime: '12:30',
    Price: '350'
  },
  ];

  flights = [
    { Name: 'Juan', 
      Lastname: 'Perez',
      IdentityDocument: '12.323.257-9',
      SeatNumber: 'B23',
    },
  ];
  constructor(
    private _dialog: MatDialog,
    private _coreService: CoreService,
    private confirmDialogService: ConfirmDialogService
    ) {}
  // Define las columnas que quieres mostrar
  firstDisplayedColumns: string[] = ['Name','Lastname','IdentityDocument','SeatNumber', 'edit', 'delete']
  secondDisplayedColumns: string[] = ['Id', 'OfficeId', 'OriginAirportId', 'FinalAirportId', 'Startime', 'Endtime', 'Price'];
  ngOnInit(): void {
  }
  editPassenger(flight: any): void {
   const dialogRef = this._dialog.open(EditPassengerComponent, {
      width: '250px',
      data: { passenger: Object.assign({}, flight) } // enviamos una copia del pasajero para evitar cambios en tiempo real
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualiza tu pasajero con los datos del formulario
        Object.assign(flight, result); // Esto es una edición directa de los datos del cliente. En un entorno real, llamarías a una API.
      }
    });
  }

  deletePassenger(flight: any): void {
    // Primero, pide confirmación al usuario
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Estás seguro de que quieres eliminar este pasajero?'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        const index = this.flights.indexOf(flight);
        if (index > -1) {
          this.flights.splice(index, 1);
          this.flights = [...this.flights];
        }
      }
    });
  }
}
