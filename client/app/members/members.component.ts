import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '../authenticator.service';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  users: any[];

  constructor(private userService: UserService, private auth: AuthenticatorService, private route: Router) { }

  ngOnInit(): void {
    this.getUsers();
    this.auth.isLoggedIn()
      .subscribe(response => {
        if (!response.auth) {
          this.route.navigate(['login']);
        }
      });
  }

  getUsers(): void {
    this.userService.getMembers()
      .subscribe(users => this.users = users);
  }

}
