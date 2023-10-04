import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

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

  bonus: number[] = [
    0,
    1,
  ]

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<AddEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
  ) {
    this.employeeForm = this._fb.group({
      rut: ['', [Validators.required, this.rutValidator]],
      name: '',
      lastName: '',
      age: '',
      email: ['', [Validators.required, Validators.email]],
      role: ['', [this.roleToNumber]],
      workPosition: '',
      country: '',
      city: '',
      bonus: ['',[this.bonusToNumber]],
    })
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

  limitAgeInput(event: any) {
    const input = event.target;
    const maxLength = 2;
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  }

  rutValidator(control: AbstractControl): ValidationErrors | null {
    const rut = control.value;
    // Regular expression for RUT validation
    const rutPattern = /^[0-9]{7,8}-[0-9K]$/;

    if (!rutPattern.test(rut)) {
      return { invalidRut: true };
    }
    // Separate the RUT into digits and the verifier (last character)
    const parts = rut.split('-');
    const digits = parts[0].split('').reverse().map(Number);
    const verifier = parts[1];
  
    // Calculate the verification digit
    let sum = 0;
    let multiplier = 2;
  
    for (const digit of digits) {
      sum += digit * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
  
    let expectedVerifier = String(11 - (sum % 11));
  
    if (expectedVerifier === '11') {
      expectedVerifier = '0';
    } else if (expectedVerifier === '10') {
      expectedVerifier = 'K';
    }
  
    if (expectedVerifier !== verifier.toUpperCase()) {
      return { invalidRut: true };
    }
    // If all checks pass, the RUT is valid
    return null;
  }
  
  roleToNumber(role: string): number{
    if(role == "Admin"){
      return 1;
    }
    if(role == "Empleado"){
     return 2;
    }
    else{
      return 0;
    }
  }
  
  roleToString(role: number): string {
    if (role === 1) {
      return 'Admin';
    } else if (role === 2) {
      return 'Empleado';
    } else {
      return 'Default';
    }
  }

  bonusToNumber(role: string): number{
    if(role == "Sí"){
      return 1;
    }
    else{
      return 0;
    }
  }

  bonusToString(role: number): string {
    if (role === 1) {
      return 'Sí';
    } else {
      return 'No';
    }
  }
  
}
