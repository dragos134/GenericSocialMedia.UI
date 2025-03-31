import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionsHomeComponent } from './terms-conditions-home.component';

describe('TermsConditionsHomeComponent', () => {
  let component: TermsConditionsHomeComponent;
  let fixture: ComponentFixture<TermsConditionsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsConditionsHomeComponent]
    });
    fixture = TestBed.createComponent(TermsConditionsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
