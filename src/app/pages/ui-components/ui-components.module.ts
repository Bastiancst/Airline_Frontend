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
import { AssigmentCrudComponent } from './assigment-crud/assigment-crud.component';
import { AssigmentAddComponent } from './assigment-crud/assigment-add/assigment-add/assigment-add.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AssigmentDetailsComponent } from './assigment-crud/assigment-details/assigment-details/assigment-details.component';

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
    MatCheckboxModule,
  ],
  declarations: [
    UserPanelComponent,
    EmployeeComponent,
    AddEditFormComponent,
    ConfirmDialogComponent,
    AssigmentCrudComponent,
    AssigmentAddComponent,
    AssigmentDetailsComponent,
    
  ],
})
export class UicomponentsModule {}
