import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.css']
})
export class DeleteTodoComponent {
  @Input() parentToDo: any;
  @Output() isDeleted = new EventEmitter<string>();
  deleteSuccess = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  onDelete(event) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth': localStorage.getItem('token') || '',
        observe: 'response'
      })
    };
    this.http.delete(`http://localhost:3000/todos/${this.parentToDo._id}`, httpOptions)
    .subscribe((data: ({todo: {_id: string, token: string}})) => {
      this.parentToDo.token = data.todo.token;
      this.deleteSuccess = true;
      setTimeout(() => this.isDeleted.emit(this.parentToDo._id), 2000);
     }, (error: any) => {
     }
   );
  }
}
