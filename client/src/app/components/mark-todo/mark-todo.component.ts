import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-mark-todo',
  templateUrl: './mark-todo.component.html',
  styleUrls: ['./mark-todo.component.css']
})
export class MarkTodoComponent {
  @Input() parentToDo: any;
  private readonly notifier: NotifierService;

  constructor(private http: HttpClient, private router: Router, private notifierService: NotifierService) {
    this.notifier = notifierService;
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
      this.parentToDo.completedAt = data.todo.completedAt;
      this.router.navigate([('/todo-list')]);
     }, (error: any) => {
     }
   );
  }

  displayCompleted() {
    return '' + this.parentToDo.completed;
  }

  onUpdate(editInput) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth': localStorage.getItem('token') || '',
        observe: 'response'
      })
    };
    this.http.patch(`http://localhost:3000/todos/${this.parentToDo._id}`, {'text': editInput.value  }, httpOptions)
    .subscribe((data: ({todo: {_id: string, text: string}})) => {
      this.parentToDo.text = data.todo.text;
      this.notifier.notify( 'success', 'Your to do has been updated!' );
      editInput.value = '';
     }, (error: any) => {
      console.log(error);
      this.notifier.notify( 'error', 'Unable to update to do list!' );
     }
   );
  }

  // displayUpdate() {
  //   return '' + this.parentToDo.text;
  // }

}
