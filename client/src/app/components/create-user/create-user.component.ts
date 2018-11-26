import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
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

  onCreateUser() {
    this.pending = true;
    this.submitted = true;
    this.http.post('http://localhost:3000/users', ({email: this.email.value, password: this.password.value}))

    .subscribe((data: HttpResponse<({_id: string, email: string})>) => {
       this.completed = true;
       this.pending = false;
      }, (error: any) => {
        this.completed = false;
        this.pending = false;
      }
    );
  }

  ngOnInit() {
  }

}
