import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTodoComponent } from './post-todo.component';

describe('PostTodoComponent', () => {
  let component: PostTodoComponent;
  let fixture: ComponentFixture<PostTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
