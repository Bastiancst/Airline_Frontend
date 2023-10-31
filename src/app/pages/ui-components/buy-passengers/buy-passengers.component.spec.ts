import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPassengersComponent } from './buy-passengers.component';

describe('BuyPassengersComponent', () => {
  let component: BuyPassengersComponent;
  let fixture: ComponentFixture<BuyPassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyPassengersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
