import { Routes } from '@angular/router';

// ui
import { EmployeeComponent } from './employee/employee.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { PassengersComponent } from './passengers/passengers.component';
import { BuyPassengersComponent } from './buy-passengers/buy-passengers.component';
import { FligthInformationComponent } from './fligth-information/fligth-information.component';
import { FlightsAvailableComponent } from './flights-available/flights-available.component';

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
      },
      {
        path: 'flight-information',
        component: FligthInformationComponent
      },
      {
        path: 'flights-available',
        component: FlightsAvailableComponent
      }
    ],
  },
];
