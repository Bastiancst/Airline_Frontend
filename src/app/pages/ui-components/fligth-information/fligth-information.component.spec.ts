import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FligthInformationComponent } from './fligth-information.component';

describe('FligthInformationComponent', () => {
  let component: FligthInformationComponent;
  let fixture: ComponentFixture<FligthInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FligthInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FligthInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
