import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  private readonly notifier: NotifierService;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notifierService: NotifierService,
    private cd: ChangeDetectorRef) {
    this.notifier = notifierService;
  }

  onCreateUser() {
    this.http.post('http://localhost:3000/users', ({email: this.email.value, password: this.password.value}))
    .subscribe((data: HttpResponse<({_id: string, email: string})>) => {
      this.notifier.notify( 'success', 'Your account has been created! Please login to proceed.' );
      this.router.navigate([('/login')]);
      }, (error: any) => {
        this.notifier.notify( 'error', 'Unable to create user account!' );
      }
    );
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }
}
