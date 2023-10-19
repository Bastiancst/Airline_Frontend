import { Routes } from '@angular/router';

// ui
import { EmployeeComponent } from './employee/employee.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { RoleGuard } from 'src/app/guards/role.guard';
import { Role } from '../enums/role.enum';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'employee',
        component: EmployeeComponent,
        canActivate: [RoleGuard],
        data: {roles: ['Admin']}
      },
      {
        path: 'user-panel',
        component: UserPanelComponent,
        canActivate: [RoleGuard]
      },
    ],
  },
];
