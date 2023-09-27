import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { CrudRequest } from '../employee/Models/crud-request';
import { Router } from '@angular/router';
import { CrudResponse } from '../employee/Models/crud-response';
import { Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.scss']
})
export class AddEditFormComponent implements OnInit {
  employeeForm: FormGroup;

  countries: string[] = [
    'Chile',
    'Argentina',
    'Brazil',
    'Perú',
    'Ecuador',
    'Colombia',
    'Venenzuela',
    'Bolvia',
    'Mexico',
    'E.E.U.U',
    'Panamá',
    'Puerto Rico',
  ];

  workPositions: string[] = [
    'Piloto',
    'Auxiliar de vuelo',
    'Azafata',
    'Gerente',
    'Ingeniero aeronautico',
    'Mecanico',
    'Tecnico de Operaciones',
    'Tecnico administrativo',
    'Seguridad',
  ];

  roles: number[] = [
    0,
    1,
    2,
  ]

  /*
  crudData: CrudRequest = {
    rut: '',
    name: '',
    lastname: '',
    age: 0,
    email: '',
    role: 1,
    workPosition: '',
    country: '',
    city: '',
    bonus: 0,
  };
  */

  //constructor(private apiService: ApiRequestService, private router: Router) {}

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<AddEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.employeeForm = this._fb.group({
      rut: '',
      name: '',
      lastName: '',
      age: '',
      email: '',
      role: '',
      workPosition: '',
      country: '',
      city: '',
      bonus: '',
    });
  }

  ngOnInit(): void {
    this.employeeForm.patchValue(this.data);
  }

  /*
  onFormSubmit() {
    if (this.employeeForm.valid) {
        this._empService.addEmployee(this.employeeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },                                                                    
          error: (err: any) => {
            console.error(err);
          },
        });                                                     
      }
    }
  */

    onFormSubmit() {
    if (this.employeeForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.employeeForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Empleado actualizado!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addEmployee(this.employeeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Empleado añadido!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    } 
  }


  /*
  onSubmit() 
  {
    console.log('Empleado Añadido con exito:');

    this.apiService.post<CrudResponse, CrudRequest>('/api/employee/create', this.crudData).subscribe
        (
            response => {
                console.log('Empleado Creado:', response);
                if(response.success)
                {
                  this.router.navigate(['/ui-components/employee']);
                }
                
            },
            error => {
                console.error('Error al crear empleado:', error);
            }
        );
  }
  */
}
