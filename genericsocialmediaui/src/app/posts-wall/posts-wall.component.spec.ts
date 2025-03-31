import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsWallComponent } from './posts-wall.component';

describe('PostsWallComponent', () => {
  let component: PostsWallComponent;
  let fixture: ComponentFixture<PostsWallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsWallComponent]
    });
    fixture = TestBed.createComponent(PostsWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
