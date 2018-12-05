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

  finalDelteUser() {
    this.userService.onDeleteUser();
  }

  finalLogoff() {
    this.userService.onLogoff();
  }
  ngOnInit() {
  }

}
