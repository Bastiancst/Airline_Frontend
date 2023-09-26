import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { CrudRequest } from '../employee/Models/crud-request';
import { Router } from '@angular/router';
import { CrudResponse } from '../employee/Models/crud-response';
import { CrudUpdate } from '../employee/Models/crud-update';
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})

export class EditFormComponent {

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

  crudData: CrudUpdate = {
    id: "string",
    rut: "string",
    name: "string",
    lastname: "string",
    age: 0,
    email: "string",
    role: 0,
    workPosition: "string",
    country: "string",
    city: "string",
    bonus: 0,
  };

  constructor(private apiService: ApiRequestService, private router: Router) {}


  onSubmit() 
  {
    console.log('Empleado Añadido con exito:');

    this.apiService.put<CrudResponse, CrudUpdate>('/api/employee/update/', this.crudData).subscribe
        (
            response => {
                console.log('Empleado actualizado:', response);
                if(response.success)
                {
                  this.router.navigate(['/ui-components/employee']);
                }
                
            },
            error => {
                console.error('Error al actualizar empleado:', error);
            }
        );
  }


}

