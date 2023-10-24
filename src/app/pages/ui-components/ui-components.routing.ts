import { Routes } from '@angular/router';

// ui
import { EmployeeComponent } from './employee/employee.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { AssigmentCrudComponent } from './assigment-crud/assigment-crud.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'employee',
        component: EmployeeComponent,
      },
      {
        path: 'user-panel',
        component: UserPanelComponent 
      },
      {
        path: 'assigment',
        component: AssigmentCrudComponent 
      },
    ],
  },
];
