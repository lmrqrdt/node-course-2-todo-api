import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.css']
})
export class DeleteTodoComponent {
  @Input() parentToDo: any;
  @Output() isDeleted = new EventEmitter<string>();
  deleteSuccess = false;
  private readonly notifier: NotifierService;

  constructor(private http: HttpClient,  notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  onDelete(event) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth': localStorage.getItem('token') || '',
        observe: 'response'
      })
    };
    this.http.delete(`https://rocky-everglades-44486.herokuapp.com/todos/${this.parentToDo._id}`, httpOptions)
    .subscribe((data: ({todo: {_id: string, token: string}})) => {
      this.parentToDo.token = data.todo.token;
      this.deleteSuccess = true;
      this.notifier.notify( 'success', 'Your to do has been deleted!' );
      this.isDeleted.emit(this.parentToDo._id);
     }, (error: any) => {
       this.notifier.notify('error', 'Unable to delete to do!');
     }
   );
  }
}
