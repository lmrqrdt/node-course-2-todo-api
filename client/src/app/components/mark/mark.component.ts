import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent {
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
    this.http.patch(`http://localhost:3000/todos/${this.parentToDo._id}`, {'completed': event.checked}, httpOptions)
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
