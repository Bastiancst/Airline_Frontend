import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { AuthenticationRoutes } from './authentication.routing';
import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ModifyPasswordComponent } from './modify-password/modify-password.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ViewBuyComponent } from './view-buy-status/view-buy/view-buy.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    AppSideLoginComponent,
    AppSideRegisterComponent,
    VerifyCodeComponent,
    EmailVerifiedComponent,
    ForgotPasswordComponent,
    ModifyPasswordComponent,
    UnauthorizedComponent,
    ViewBuyComponent,
  ],
})
export class AuthenticationModule {}
