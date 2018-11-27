import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  pending: boolean;
  completed: boolean;
  submitted: boolean;

  constructor(private http: HttpClient) {
    this.pending = false;
    this.completed = false;
    this.submitted = false;
  }

  onLogin() {
    this.pending = true;
    this.submitted = true;
    this.http.post('http://localhost:3000/users/login', ({email: this.email.value, password: this.password.value}), { observe: 'response' })
      .subscribe((data: HttpResponse<({email: string, password: string})>) => {
        localStorage.setItem('token', data.headers.get('x-auth'));
        this.completed = true;
        this.pending = false;
     }, (error: any) => {
       this.completed = false;
       this.pending = false;
     });
  }

  ngOnInit() {
  }

}
