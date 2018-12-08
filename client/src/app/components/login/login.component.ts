import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  private readonly notifier: NotifierService;

  constructor(private http: HttpClient, private router: Router, notifierService: NotifierService, private cd: ChangeDetectorRef) {
    this.notifier = notifierService;
  }

  onLogin() {
    this.http.post('https://rocky-everglades-44486.herokuapp.com/users/login',
      ({email: this.email.value, password: this.password.value}),
      { observe: 'response' })
      .subscribe((data: HttpResponse<({email: string, password: string})>) => {
        localStorage.setItem('token', data.headers.get('x-auth'));
        this.notifier.notify( 'success', 'User sucessfully logged in!' );
        this.router.navigate(['/todo-list']);
     }, (error: any) => {
       this.notifier.notify( 'error', 'Login credentials invalid!' );
     });
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }
}
