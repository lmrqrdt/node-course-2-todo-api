import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css']
})
export class LogoffComponent {
  userToken = new HttpHeaders({'Content Type': 'xauth'});

  constructor(private http: HttpClient) {
    const httpOptions = {
      userToken = new HttpHeaders({'Content Type': 'x-auth'});
    }
  }

  onLogoff() {
    this.http.delete('http://localhost:3000/users/me/token');
      // .subscribe((data: any) => this.userToken = data.token);

  }

  ngOnInit() {
  }

}
