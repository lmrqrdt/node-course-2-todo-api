import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  pending: boolean;
  completed: boolean;
  submitted: boolean;

  todos: any[];
  constructor(http: HttpClient) {
    this.pending = true;
    this.completed = false;
    this.submitted = true;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth': localStorage.getItem('token') || ''
      })
    };
    http.get('http://localhost:3000/todos', httpOptions)
      .subscribe((data: any) => {
        this.todos = data.todos;
        this.completed = true;
        this.pending = false;

      }, (e) => {
        this.completed = false;
        this.pending = false;
      });
  }
}
