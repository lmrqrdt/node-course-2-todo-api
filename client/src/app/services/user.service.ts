import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
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
      this.notifier.notify( 'error', 'No user' );
      return null;
    });
  }
}
