import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CoreService } from 'src/app/pages/core/core.service';

@Component({
  selector: 'app-assigment-details',
  templateUrl: './assigment-details.component.html',
  styleUrls: ['./assigment-details.component.scss']
})
export class AssigmentDetailsComponent {

  constructor(
    private _assigment: AssignmentService,
    private _coreService: CoreService,
    private router:Router,
  ){}

  
  /*
  getAssignment() {
    this._assigment.getAssignment(1F0B504F-5DAA-4881-B6CE-6A88CA928CA5).subscribe({
      next: (res) => {
      },
      error: console.log,
    });
  }
  */
  
}
