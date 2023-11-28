import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectWebpayComponent } from './redirect-webpay.component';

describe('RedirectWebpayComponent', () => {
  let component: RedirectWebpayComponent;
  let fixture: ComponentFixture<RedirectWebpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectWebpayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectWebpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
