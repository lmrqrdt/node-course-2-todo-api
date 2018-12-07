import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-post-todo',
  templateUrl: './post-todo.component.html',
  styleUrls: ['./post-todo.component.css']
})
export class PostTodoComponent {
  text = new FormControl('', [Validators.required, Validators.minLength(6)]);
  private readonly notifier: NotifierService;

  constructor(private http: HttpClient, private router: Router, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

    onCreatePost() {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'x-auth': localStorage.getItem('token') || ''
        })
      };
      this.http.post('https://rocky-everglades-44486.herokuapp.com/todos', ({ text: this.text.value }), httpOptions)
      .subscribe((data: HttpResponse<({text: string})>) => {
        this.notifier.notify( 'success', 'Your to do has been created and saved!' );
        this.router.navigate(['/todo-list']);
     }, (error: any) => {
        this.notifier.notify( 'error', 'Unable to create to do!' );
     });
  }
}

