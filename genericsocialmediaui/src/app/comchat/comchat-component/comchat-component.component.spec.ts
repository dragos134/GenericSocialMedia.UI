import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComchatComponentComponent } from './comchat-component.component';

describe('ComchatComponentComponent', () => {
  let component: ComchatComponentComponent;
  let fixture: ComponentFixture<ComchatComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComchatComponentComponent]
    });
    fixture = TestBed.createComponent(ComchatComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
