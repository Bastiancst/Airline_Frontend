import { Routes } from '@angular/router';

// ui
import { EmployeeComponent } from './employee/employee.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { PassengersComponent } from './passengers/passengers.component';
import { BuyPassengersComponent } from './buy-passengers/buy-passengers.component';

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
        path: 'passengers',
        component: PassengersComponent
      },
      {
        path: 'buyPassenger',
        component: BuyPassengersComponent
      }
    ],
  },
];
