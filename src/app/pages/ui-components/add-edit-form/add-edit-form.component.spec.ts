import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFormComponent } from './add-edit-form.component';

describe('EmpAddEditComponent', () => {
  let component: AddEditFormComponent;
  let fixture: ComponentFixture<AddEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
