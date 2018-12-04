import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css']
})
export class LogoffComponent {

  private readonly notifier: NotifierService;

  constructor(private http: HttpClient, private router: Router, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  onLogoff() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application.json',
        'x-auth': localStorage.getItem('token')
      })
    };
    this.http.delete('http://localhost:3000/users/me/token', httpOptions)
    .subscribe((data: HttpResponse<any>) => {
      localStorage.removeItem('token');
      this.notifier.notify( 'success', 'User logged off!' );
      this.router.navigate(['/']);
   }, (error: any) => {
    this.notifier.notify( 'error', 'No user is logged in!' );
    this.router.navigate(['/']);
    });
  }
}

