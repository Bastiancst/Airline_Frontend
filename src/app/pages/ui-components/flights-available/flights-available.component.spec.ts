import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsAvailableComponent } from './flights-available.component';

describe('FlightsAvailableComponent', () => {
  let component: FlightsAvailableComponent;
  let fixture: ComponentFixture<FlightsAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsAvailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
