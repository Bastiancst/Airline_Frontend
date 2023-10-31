import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';
import { CoreService } from 'src/app/pages/core/core.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assigment-details',
  templateUrl: './assigment-details.component.html',
  styleUrls: ['./assigment-details.component.scss']
})
export class AssigmentDetailsComponent implements OnInit {

  assignment: any = {}; 

  constructor(
    private _assigment: AssignmentService,
    private _coreService: CoreService,
    private router:Router,
    private route: ActivatedRoute,
  ){}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const assignmentId = params['id']; 
      this.getAssignment(assignmentId);
    });
  }
  
  getAssignment(assignmentId: string) {
    this._assigment.getAssignment(assignmentId).subscribe({
      next: (res) => {
        const assignmentData = res.result;
        this.assignment.height = assignmentData.height;
        this.assignment.weight = assignmentData.weight;
        this.assignment.wide = assignmentData.wide;
        this.assignment.lenght = assignmentData.lenght;
        this.assignment.origin = assignmentData.origin;
        this.assignment.destination = assignmentData.destination;
      },
      error: console.log,
    });
  }

  BackToAssignmentList(){
    this.router.navigate(['/ui-components/assigment']);
  }
  
}
