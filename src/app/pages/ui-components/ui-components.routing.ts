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
import { RedirectWebpayComponent } from './redirect-webpay/redirect-webpay.component';

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
        canActivate: [RoleGuard],
        data: {roles: ['Client', 'Employee','Admin']}
      },
      {
        path: 'passengers',
        component: PassengersComponent,
        canActivate: [RoleGuard],
        data: {roles: ['Client', 'Employee','Admin']}
      },
      {
        path: 'buyPassenger',
        component: BuyPassengersComponent,
        canActivate: [RoleGuard],
        data: {roles: ['Client', 'Employee','Admin']}
      },
      {
        path: 'buyPassenger:?id',
        component: BuyPassengersComponent,
        canActivate: [RoleGuard],
        data: {roles: ['Client', 'Employee','Admin']}
      },
      {
        path: 'flight-information',
        component: FligthInformationComponent,
        canActivate: [RoleGuard],
        data: {roles: ['Client', 'Employee','Admin']}
      },
      {
        path: 'flights-available',
        component: FlightsAvailableComponent,
        canActivate: [RoleGuard],
        data: {roles: ['Client', 'Employee','Admin']}
      },
      {
        path: 'assigment',
        component: AssigmentCrudComponent,
        canActivate: [RoleGuard],
        data: {roles: ['Client', 'Employee','Admin']}
      },
      {
        path: 'assigment-add',
        component: AssigmentAddComponent,
        canActivate: [RoleGuard],
        data: {roles: ['Client', 'Employee','Admin']}
      },
      {
        path: 'assigment-details/:id',
        component: AssigmentDetailsComponent,
        canActivate: [RoleGuard],
        data: {roles: ['Client', 'Employee','Admin']}
      },
      {
        path: 'redirect-webpay',
        component: RedirectWebpayComponent,
        canActivate: [RoleGuard],
        data: {roles: ['Client', 'Employee','Admin']}
      },
    ],
  },
];
