import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  pending: boolean;
  completed: boolean;
  submitted: boolean;

  todos: any[];
  constructor(private http: HttpClient) {
    this.pending = true;
    this.completed = false;
    this.submitted = true;
  }
  onDelete() {
    this.pending = true;
    this.submitted = true;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application.json',
        'x-auth': localStorage.getItem('token')
      })
    };
    this.http.delete('http://localhost:3000/todos', httpOptions)
    .subscribe((data: HttpResponse<any>) => {
      this.completed = true;
      this.pending = false;

    }, (e) => {
      this.completed = false;
      this.pending = false;
    });
  }

  ngOnInit() {
  }

}
