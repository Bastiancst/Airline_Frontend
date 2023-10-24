import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { MatDialogModule, matDialogAnimations } from '@angular/material/dialog';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { UiComponentsRoutes } from './ui-components.routing';

// ui components
import { MatNativeDateModule } from '@angular/material/core';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { EmployeeComponent } from './employee/employee.component';
import { MatButtonModule } from '@angular/material/button';
import { AddEditFormComponent } from './add-edit-form/add-edit-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PassengersComponent } from './passengers/passengers.component';
import { BuyPassengersComponent } from './buy-passengers/buy-passengers.component';
import { FligthInformationComponent } from './fligth-information/fligth-information.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UiComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  declarations: [
    UserPanelComponent,
    EmployeeComponent,
    AddEditFormComponent,
    ConfirmDialogComponent,
    PassengersComponent,
    BuyPassengersComponent,
    FligthInformationComponent,
    
  ],
})
export class UicomponentsModule {}
