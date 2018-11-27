import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-post-todo',
  templateUrl: './post-todo.component.html',
  styleUrls: ['./post-todo.component.css']
})
export class PostTodoComponent {
  text = new FormControl('', [Validators.required, Validators.minLength(6)]);
  pending: boolean;
  completed: boolean;
  submitted: boolean;

  constructor(private http: HttpClient) {
    this.pending = true;
    this.completed = false;
    this.submitted = true;
    }

    onCreatePost() {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'x-auth': localStorage.getItem('token') || ''
        })
      };
      this.http.post('http://localhost:3000/todos', ({ text: this.text.value }), httpOptions)
      .subscribe((data: HttpResponse<({text: string})>) => {
        this.completed = true;
        this.pending = false;
     }, (error: any) => {
       this.completed = false;
       this.pending = false;
     });
  }
}

