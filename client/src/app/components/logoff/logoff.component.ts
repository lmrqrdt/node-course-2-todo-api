import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css']
})
export class LogoffComponent {
  pending: boolean;
  completed: boolean;
  submitted: boolean;

  constructor(private http: HttpClient) {
    this.pending = false;
    this.completed = false;
    this.submitted = false;
  }

  onLogoff() {
    this.pending = true;
    this.submitted = true;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application.json',
        'x-auth': localStorage.getItem('token')
      })
    };
    this.http.delete('http://localhost:3000/users/me/token', httpOptions)
    .subscribe((data: HttpResponse<any>) => {
      localStorage.removeItem('token');
      this.completed = true;
      this.pending = false;
   }, (error: any) => {
     this.completed = false;
     this.pending = false;
   });
  }

}