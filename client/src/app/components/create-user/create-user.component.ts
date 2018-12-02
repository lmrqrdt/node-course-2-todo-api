import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  private readonly notifier: NotifierService;

  constructor(private http: HttpClient, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  onCreateUser() {
    this.http.post('http://localhost:3000/users', ({email: this.email.value, password: this.password.value}))
    .subscribe((data: HttpResponse<({_id: string, email: string})>) => {
      this.notifier.notify( 'success', 'Your account has been created! Please login to proceed.' );
      }, (error: any) => {
        this.notifier.notify( 'error', 'Unable to create user account!' );
      }
    );
  }

  ngOnInit() {
  }

}
