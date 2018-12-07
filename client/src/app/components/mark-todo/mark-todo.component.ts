import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mark-todo',
  templateUrl: './mark-todo.component.html',
  styleUrls: ['./mark-todo.component.css']
})
export class MarkTodoComponent {
  @Input() parentToDo: any;

  constructor(private http: HttpClient) {
  }

  onMark(event) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth': localStorage.getItem('token') || '',
        observe: 'response'
      })
    };
    this.http.patch(`https://rocky-everglades-44486.herokuapp.com/todos/${this.parentToDo._id}`, {'completed': event.checked}, httpOptions)
    .subscribe((data: ({todo: {_id: string, completed: Boolean, text: string, completedAt: string}})) => {
      this.parentToDo.completed = data.todo.completed;
      this.parentToDo.completedAt = data.todo.completedAt;
     }, (error: any) => {
     }
   );
  }
  displayCompleted() {
    return '' + this.parentToDo.completed;
  }
}
