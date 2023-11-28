import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTextComponent } from './chat-text.component';

describe('ChatTextComponent', () => {
  let component: ChatTextComponent;
  let fixture: ComponentFixture<ChatTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
