import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigmentCrudComponent } from './assigment-crud.component';

describe('AssigmentCrudComponent', () => {
  let component: AssigmentCrudComponent;
  let fixture: ComponentFixture<AssigmentCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigmentCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigmentCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
