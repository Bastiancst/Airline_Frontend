import { Routes } from '@angular/router';
import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { AppSideVerifyComponent } from './verify-code/verify-code.component';
=======
import { emailVerifyComponent } from './verify-email/verify-email.component';
import { forgotPassComponent } from './forgotPass/forgotPassComponent';
import { enterPassComponent } from './enterPass/enterPass.component';

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
        path: 'verify-email',
        component: emailVerifyComponent,
      },
      {
        path: 'forgotPass',
        component: forgotPassComponent,
      },
      {
        path: 'enterPass',
        component: enterPassComponent,
      },
    ],
  },
];
