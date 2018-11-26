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
        'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmZhZjc3YmFkYWI3NDAzYjgxYzBmNTQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQzMTc0MDMzfQ.gNq2ZMH1InLIq-GJ5_tZccmofqp53O9jsslKxrVJBFU'
      })
    };
    http.get('http://localhost:3000/todos', httpOptions)
      .subscribe((data: any) => this.todos = data.todos);
  }
}
