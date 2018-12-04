import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly notifier: NotifierService;

  constructor(private http: HttpClient, private router: Router, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  onDeleteUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application.json',
        'x-auth': localStorage.getItem('token')
      })
    };
    this.http.get('http://localhost:3000/users/me', httpOptions)
    .subscribe((body: {_id: string, email: string}) => {
      console.log(body);
      this.notifier.notify( 'success', 'User returned!' );
      this.http.delete(`http://localhost:3000/users/${body._id}`, httpOptions)
      .subscribe((body2: {_id: string, email: string}) => {
        localStorage.removeItem('token');
        this.notifier.notify( 'success', 'Your account has been deleted!' );
        this.router.navigate(['/']);
     }, (error: any) => {
        this.notifier.notify( 'error', 'Unable to delete account!' );
      });
    },
    (error: any) => {
      this.notifier.notify( 'error', 'No user. Please log in to delete your account.' );
      return null;
    });
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
