import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  todos: any[];
  constructor(http: HttpClient) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjgyMTllYWM4NDlmMjBkZjA4ZGYwOTIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM1MjUyOTk3fQ.x4F5IutlNKImZVVaWTwdPPmyAJXysnXcbXOr3thuVzs'
      })
    };
    http.get('http://localhost:3000/todos', httpOptions)
      .subscribe((data: any) => this.todos = data.todos);
  }
}
