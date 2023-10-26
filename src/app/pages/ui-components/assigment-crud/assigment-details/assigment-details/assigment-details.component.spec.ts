import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigmentDetailsComponent } from './assigment-details.component';

describe('AssigmentDetailsComponent', () => {
  let component: AssigmentDetailsComponent;
  let fixture: ComponentFixture<AssigmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigmentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
