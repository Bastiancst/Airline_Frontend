import { Routes } from '@angular/router';

// ui
import { EmployeeComponent } from './employee/employee.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { RoleGuard } from 'src/app/guards/role.guard';
import { Role } from '../enums/role.enum';
import { PassengersComponent } from './passengers/passengers.component';
import { BuyPassengersComponent } from './buy-passengers/buy-passengers.component';
import { FligthInformationComponent } from './fligth-information/fligth-information.component';
import { FlightsAvailableComponent } from './flights-available/flights-available.component';
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
        canActivate: [RoleGuard],
        data: {roles: ['Admin']}
      },
      {
        path: 'user-panel',
        component: UserPanelComponent,
        canActivate: [RoleGuard]
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
        path: 'buyPassenger:?id',
        component: BuyPassengersComponent
      },
      {
        path: 'flight-information',
        component: FligthInformationComponent
      },
      {
        path: 'flights-available',
        component: FlightsAvailableComponent
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
        path: 'assigment-details/:id',
        component: AssigmentDetailsComponent 
      },
    ],
  },
];
