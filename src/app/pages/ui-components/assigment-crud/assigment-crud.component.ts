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
import { AssignmentService } from 'src/app/services/assignment.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-assigment-crud',
  templateUrl: './assigment-crud.component.html',
  styleUrls: ['./assigment-crud.component.scss']
})

export class AssigmentCrudComponent implements OnInit {

  displayedColumns: string[] = [
    'weight', 
    'height', 
    'origin',  
    'destination', 
    'detalles'
  ];

  dataSource!: MatTableDataSource<CrudResponse["result"]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router:Router,
    private _dialog: MatDialog,
    private _assignService: AssignmentService,
    private _coreService: CoreService,
    private confirmDialogService: ConfirmDialogService
    ) {}

  ngOnInit(): void {
    this.getAssignmentList()
  }

  openAddForm() {
    const dialogRef = this._dialog.open(AddEditFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAssignmentList();
        }
      },
    });
  }
  openAdd(){
    this.router.navigate(['/ui-components/assigment-add']);
  }

  getAssignmentList() {
    this._assignService.getAssigmentList().subscribe({
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

}
