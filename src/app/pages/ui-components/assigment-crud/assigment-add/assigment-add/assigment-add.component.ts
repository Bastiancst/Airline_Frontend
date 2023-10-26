import { Component } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, NgModel } from '@angular/forms';
import { Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Validators } from '@angular/forms';
import { CoreService } from 'src/app/pages/core/core.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-assigment-add',
  templateUrl: './assigment-add.component.html',
  styleUrls: ['./assigment-add.component.scss']
})
export class AssigmentAddComponent {
  assignmentForm: FormGroup;
  receiverForm: FormGroup;

  Origins: string[] = [
    'Santiago, Chile',
    'Puerto Montt, Chile',
    'Iquique, Chile',
    'Concepción, Chile',
    'Buenos Aires, Argentina',
    'Ciudad de Córdoba, Aregntina',
    'Lima, Peru',
    'Quito, Ecuador',
    'Cuidad de Mexico, Mexico',
    'Guadalajara, Mexico',
    'Monterrey, Mexico',
    'La Paz, Bolivia',
    'Sao Pablo, Brazil',
    'Rio de Janeiro, Brazil',
    'Brasilia, Brazil',
    'Bogotá, Colombia',
    'Caracas, Venenzuela',
    'San Juan, Puerto Rico',
    'Montevideo, Uruguay',
    'Asunción, Paraguay',
    'San Salvador, El Salvador',
    'Miami, E.E.U.U',
    'Los Angeles, E.E.U.U',
    'Miami, E.E.U.U',
    'New York, E.E.U.U',
    'Washinton DC, E.E.U.U',
    'Cuidad de Guatemala, Guatemala',
    'Tegucipalga, Honduras',
    'Panamá, Panamá',
  ];

  Destinations: string[] = [
    'Santiago, Chile',
    'Puerto Montt, Chile',
    'Iquique, Chile',
    'Concepción, Chile',
    'Buenos Aires, Argentina',
    'Ciudad de Córdoba, Aregntina',
    'Lima, Peru',
    'Quito, Ecuador',
    'Cuidad de Mexico, Mexico',
    'Guadalajara, Mexico',
    'Monterrey, Mexico',
    'La Paz, Bolivia',
    'Sao Pablo, Brazil',
    'Rio de Janeiro, Brazil',
    'Brasilia, Brazil',
    'Bogotá, Colombia',
    'Caracas, Venenzuela',
    'San Juan, Puerto Rico',
    'Montevideo, Uruguay',
    'Asunción, Paraguay',
    'San Salvador, El Salvador',
    'Miami, E.E.U.U',
    'Los Angeles, E.E.U.U',
    'Miami, E.E.U.U',
    'New York, E.E.U.U',
    'Washinton DC, E.E.U.U',
    'Cuidad de Guatemala, Guatemala',
    'Tegucipalga, Honduras',
    'Panamá, Panamá',
  ];

  constructor(
    private _fb: FormBuilder,
    private _assignService: AssignmentService,
    private _coreService: CoreService,
    private router:Router,
  ) {
    this.assignmentForm = this._fb.group({
      height: '',
      weight: '',
      wide: '',
      lenght: '',
      origin: '',
      destination: '',
      isCopyDocumentEmail:  new FormControl(false),
      receiver: {},
    })
    this.receiverForm = this._fb.group({
      name: '',
      lastName: '',
      addres: '',
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: '',
    })
  }

  onFormSubmit(){
    //PUT IN THIS LINE THE CODE FOR JOIN THE RECEIVERFORM DATA ON RECEIVER PROPERTY IN ASSIGNMENTFORM
    this.assignmentForm.patchValue({
      receiver: this.receiverForm.value
    });
    console.log(this.assignmentForm)
      this._assignService.addAssignment(this.assignmentForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Encomienda añadida!');
          this.router.navigate(['/ui-components/assigment']);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }

  limitNumberInput(num: number, event: any) {
    const input = event.target;
    const maxLength = num;
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  }

  BackToAssignmentList(){
    this.router.navigate(['/ui-components/assigment']);
  }
  

  
   

}
