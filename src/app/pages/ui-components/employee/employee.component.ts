// employee.components.ts
import { Component, OnInit, ViewChild} from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { CrudResponse } from './Models/crud-response';
import { Router } from '@angular/router';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseModel } from './Models/get-employees';
import { Role } from "src/app/pages/enums/role.enum";
import { EmployeeService } from 'src/app/services/employee.service';
import { CoreService } from '../../core/core.service';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  displayedColumns: string[] = [
    'rut', 
    'name', 
    'country', 
    'role', 
    'workPosition', 
    'actions'
  ];

  /*
  employeeData: CrudResponse["result"] = {
    id: '', 
    officeId: '', 
    rut: '', 
    name: '', 
    lastName: '', 
    age: 0, 
    email: '',
    role: Role.Default, 
    workPosition: '', 
    country: '', 
    city: '', 
    bonus: 0,
   };
   */

  dataSource!: MatTableDataSource<CrudResponse["result"]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private apiService: ApiRequestService,
    private _empService: EmployeeService,
    private _coreService: CoreService,
    private router: Router
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

  /*
  crudData: CrudResponse["result"] = {id: '', officeId: '', rut: '', name: '', lastName: '', age: 0, email: '',
   role: Role.Default, workPosition: '', country: '', city: '', bonus: 0 };

  employees: CrudResponse["result"] [];

  getEmployeeList(){

    this.apiService.get<ResponseModel>('/api/employee').subscribe(
            response => {
              console.log(response.result)
              this.employees = response.result
            },
            error => {
                console.error('Error al conectar con Empleados:', error);
            }
      );
  }
  */


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

  deleteEmployee(id : string ) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Empleado Eliminado!', 'Aceptar');
        this.getEmployeeList();
      },
      error: console.log,
    });
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

