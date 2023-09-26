// employee.components.ts
import { Component, OnInit} from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { CrudRequest } from './Models/crud-request';
import { CrudResponse } from './Models/crud-response';
import { Router } from '@angular/router';
import { UicomponentsModule } from '../ui-components.module';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseModel } from './Models/get-employees';
import { Role } from "src/app/pages/enums/role.enum";
import { EditFormComponent } from '../edit-form/edit-form.component';

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

  constructor(
    private _dialog: MatDialog,
    private apiService: ApiRequestService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getEmployeeList()
  }

  openAddForm() {
    this._dialog.open(AddEditFormComponent)
  }

  openEditForm() {
    this._dialog.open(EditFormComponent)
  }

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

  deleteEmployee(employee: any) {
    // Implement delete functionality here
  }

  getRoleName(role: Role): string {
    switch (role) {
      case Role.Default:
        return 'Default';
      case Role.Admin:
        return 'Admin';
      case Role.Empleado:
        return 'Empleado';
      default:
        return 'Desconocido';
    }
  }
}

