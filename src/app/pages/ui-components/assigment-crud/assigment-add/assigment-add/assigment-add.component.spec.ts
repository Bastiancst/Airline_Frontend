import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigmentAddComponent } from './assigment-add.component';

describe('AssigmentAddComponent', () => {
  let component: AssigmentAddComponent;
  let fixture: ComponentFixture<AssigmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigmentAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
