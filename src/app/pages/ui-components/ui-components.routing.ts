import { Routes } from '@angular/router';

// ui
import { EmployeeComponent } from './employee/employee.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { AssigmentCrudComponent } from './assigment-crud/assigment-crud.component';
import { AssigmentAddComponent } from './assigment-crud/assigment-add/assigment-add/assigment-add.component';
import { AssigmentDetailsComponent } from './assigment-crud/assigment-details/assigment-details/assigment-details.component';

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
      {
        path: 'assigment-add',
        component: AssigmentAddComponent 
      },
      {
        path: 'assigment-details',
        component: AssigmentDetailsComponent 
      },
    ],
  },
];
