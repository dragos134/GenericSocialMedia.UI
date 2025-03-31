import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitedUsersComponent } from './recruited-users.component';

describe('RecruitedUsersComponent', () => {
  let component: RecruitedUsersComponent;
  let fixture: ComponentFixture<RecruitedUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruitedUsersComponent]
    });
    fixture = TestBed.createComponent(RecruitedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
