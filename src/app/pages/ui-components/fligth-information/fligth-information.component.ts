import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { CoreService } from '../../core/core.service';
import { PassengerInfo } from '../buy-passengers/models/passengerInfo';
import { DataService } from 'src/app/services/data.service';
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

  dataSource: any;
  passengersList: PassengerInfo[] = [];
  passengerModel: PassengerInfo;
  
  constructor(
    private _dialog: MatDialog,
    private _coreService: CoreService,
    private confirmDialogService: ConfirmDialogService,
    private dataService: DataService<PassengerInfo>
    ) {
      this.dataSource = [...this.passengersList];
    }
  // Define las columnas que quieres mostrar
  firstDisplayedColumns: string[] = ['Name','Lastname','IdentityDocument','SeatNumber', 'delete']
  secondDisplayedColumns: string[] = ['Id', 'OfficeId', 'OriginAirportId', 'FinalAirportId', 'Startime', 'Endtime', 'Price'];

  ngOnInit(): void {
    this.dataService.data$.subscribe(data => {
      this.passengerModel = new PassengerInfo(data?.clientId!, data?.flightPlanningId!, data?.paymentId!, data?.name!, data?.lastName!, data?.identityDocument!, data?.age!, data?.address!, data?.phoneNumber!, data?.email!, data?.seatNumber!, data?.isCopyDocumentEmail!);

      console.log(this.passengerModel);

      this.passengersList.push(this.passengerModel);
      this.dataSource = [...this.passengersList];
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
        const index = this.passengersList.indexOf(flight);
        if (index > -1) {
          this.passengersList.splice(index, 1);
          this.dataSource = [...this.passengersList];
        }
      }
    });
  }
}
