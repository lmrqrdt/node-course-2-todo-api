import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor (private userService: UserService) {
  }

  hdrLogoff() {
    this.userService.onLogoff();
  }

  hdrDeleteUser() {
    this.userService.onDeleteUser();
  }

  hdrUserLoggedIn(): boolean {
    return this.userService.isUserLoggedIn();
  }
}
