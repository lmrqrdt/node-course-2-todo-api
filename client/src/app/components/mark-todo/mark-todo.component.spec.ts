import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkTodoComponent } from './mark-todo.component';

describe('MarkComponent', () => {
  let component: MarkComponent;
  let fixture: ComponentFixture<MarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
