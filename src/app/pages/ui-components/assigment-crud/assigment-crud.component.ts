import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudResponse } from '../employee/Models/crud-response';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { CoreService } from '../../core/core.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

@Component({
  selector: 'app-assigment-crud',
  templateUrl: './assigment-crud.component.html',
  styleUrls: ['./assigment-crud.component.scss']
})

export class AssigmentCrudComponent implements OnInit {

  displayedColumns: string[] = [
    'rut', 
    'name', 
    'country',  
    'workPosition', 
    'actions'
  ];

  dataSource!: MatTableDataSource<CrudResponse["result"]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService,
    private confirmDialogService: ConfirmDialogService
    ) {}

  ngOnInit(): void {
    this.getEmployeeList()
  }

  openAddForm() {
    const dialogRef = this._dialog.open(AddEditFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditFormComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        const employees = res.result;
        this.dataSource = new MatTableDataSource(employees);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*
  deleteEmployee(id : string ) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Empleado Eliminado!', 'Aceptar');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }
  */

  async deleteEmployee(id: string) {
    const confirmed = await this.confirmDialogService.openConfirmDialog();

    if (confirmed) {
      this._empService.deleteEmployee(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Empleado Eliminado!', 'Aceptar');
          this.getEmployeeList();
        },
        error: console.log,
      });
    }
  }


  getRoleName(role :number) {
    switch (role) {
      case role = 0:
        return 'Default';
      case role = 1:
        return 'Admin';
      case role = 2:
        return 'Empleado';
      default:
        return 'Desconocido';
    }
  }
}
