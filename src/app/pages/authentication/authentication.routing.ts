import { Routes } from '@angular/router';
import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ModifyPasswordComponent } from './modify-password/modify-password.component';
import { RoleGuard } from 'src/app/guards/role.guard';
import { Role } from '../enums/role.enum';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ViewBuyComponent } from './view-buy-status/view-buy/view-buy.component';
import { AssigmentCrudComponent } from '../ui-components/assigment-crud/assigment-crud.component';
import { FlightsAvailableComponent } from '../ui-components/flights-available/flights-available.component';
 

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
      },
      {
        path: 'verify-code',
        component: VerifyCodeComponent,
      },
      {
        path: 'email-verified',
        component: EmailVerifiedComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'modify-password',
        component: ModifyPasswordComponent,
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
      },
      {
        path: 'view-buy-status',
        component: ViewBuyComponent,
      },
      {
        path: 'assignment', // Ruta para la ventana de assignment
        component: AssigmentCrudComponent,
      },
      {
        path: 'flight-information', // Ruta para la ventana de flight
        component: FlightsAvailableComponent,
      },
    ],
  },
];
