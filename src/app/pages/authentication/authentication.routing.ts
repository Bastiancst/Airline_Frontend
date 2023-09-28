import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { AppSideVerifyComponent } from './verify-code/verify-code.component';

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
        component: AppSideVerifyComponent
      }
    ],
  },
];
