import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Validators } from '@angular/forms';
import { CoreService } from 'src/app/pages/core/core.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-assigment-add',
  templateUrl: './assigment-add.component.html',
  styleUrls: ['./assigment-add.component.scss']
})
export class AssigmentAddComponent {
  assignmentForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _assignService: AssignmentService,
    private _coreService: CoreService,
  ) {
    this.assignmentForm = this._fb.group({
      height: '',
      weight: '',
      wide: '',
      lenght: '',
      origin: '',
      destination: '',
      isCopyDocumentEmail: '',
      

    })
  }


  onFormSubmit(){
        this._assignService.addAssignment(this.assignmentForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Encomienda añadida!');
          },
          error: (err: any) => {
            console.error(err);
          },
        });
  }
   

}
