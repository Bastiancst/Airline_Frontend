import { Routes } from '@angular/router';
import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ModifyPasswordComponent } from './modify-password/modify-password.component';


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
        component: VerifyCodeComponent
      }
      ,
      {
        path: 'email-verified',
        component: EmailVerifiedComponent
      }
      ,
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      }
      ,
      {
        path: 'modify-password',
        component: ModifyPasswordComponent
      }
    ],
  },
];
