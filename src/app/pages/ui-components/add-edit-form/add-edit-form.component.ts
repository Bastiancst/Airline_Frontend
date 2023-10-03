import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
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
    'Venezuela',
    'Bolivia',
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

  bonus: number[] = [
    0,
    1,
  ]

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
}
