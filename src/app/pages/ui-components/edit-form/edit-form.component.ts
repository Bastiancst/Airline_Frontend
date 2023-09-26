import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { CrudRequest } from '../employee/Models/crud-request';
import { Router } from '@angular/router';
import { CrudResponse } from '../employee/Models/crud-response';
import { ResponseModel } from '../employee/Models/get-employees';
import { CrudUpdate } from '../employee/Models/crud-update';
import { Role } from '../../enums/role.enum';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})

export class EditFormComponent implements OnInit{

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

  constructor(private apiService: ApiRequestService, private router: Router) {}

  ngOnInit(): void {
    this.getEmployee()
  }


  crudData: CrudResponse["result"] = {id: '', officeId: '', rut: '', name: '', lastName: '', age: 0, email: '',
   role: Role.Default, workPosition: '', country: '', city: '', bonus: 0 };
  
  employee: CrudResponse["result"]

  getEmployee(){

    this.apiService.get<CrudResponse>('/api/employee/B0A44A92-33AC-4EC2-8184-2F83FF2CA22E').subscribe(
            response => {
              console.log(response.result)
              this.employee =  response.result
            },
            error => {
                console.error('Error al conectar con Empleados:', error);
            }
      );
  }

  onSubmit() 
  {
    console.log('Empleado Añadido con exito:');

    this.apiService.put<CrudResponse, CrudUpdate>('/api/employee/update', this.crudData).subscribe
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

