import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  private readonly notifier: NotifierService;

  todos: any[];
  constructor(private http: HttpClient, private router: Router, private notifierService: NotifierService) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth': localStorage.getItem('token') || ''
      })
    };
    this.notifier = notifierService;
    http.get('http://localhost:3000/todos', httpOptions)
      .subscribe((data: any) => {
        this.todos = data.todos;
        this.notifier.notify( 'success', 'This is your to do list!' );
      }, (e) => {
        this.notifier.notify( 'error', 'Unable to get to do list!' );
      });
  }

  refreshTodo(event) {
    this.todos = this.todos.filter((t) => {
      return t._id !== event;
    });
  }

  onUpdate() {

  }
}

