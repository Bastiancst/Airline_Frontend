import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { CrudRequest } from '../employee/Models/crud-request';
import { Router } from '@angular/router';
import { CrudResponse } from '../employee/Models/crud-response';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.scss']
})
export class AddEditFormComponent {
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

  constructor(private apiService: ApiRequestService, private router: Router) {}


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


}

