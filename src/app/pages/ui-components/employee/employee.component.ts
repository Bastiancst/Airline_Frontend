// employee.components.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [
    { rut: '123456789', name: 'John Doe', country: 'USA', workPosition: 'Manager' },
    { rut: '987654321', name: 'Jane Smith', country: 'Brazil', workPosition: 'Copilot' },
    { rut: '123172461', name: 'Mary Jackson', country: 'Mexico', workPosition: 'Stewardess' },
    { rut: '85768273K', name: 'Marcos Tompson', country: 'Argentina', workPosition: 'Pilot' },
    { rut: '423615397', name: 'Juan Lopez', country: 'Chile', workPosition: 'Pilot' },
    // Add more employees as needed
  ];

  displayedColumns: string[] = ['rut', 'name', 'country', 'workPosition', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

  editEmployee(employee: any) {
    // Implement edit functionality here
  }

  deleteEmployee(employee: any) {
    // Implement delete functionality here
  }
}

