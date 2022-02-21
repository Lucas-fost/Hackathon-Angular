import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '../authenticator.service';

@Component({
  providers: [AuthenticatorService],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loggedIn: boolean;

  constructor(private authService: AuthenticatorService) {}

  ngOnInit() {
    this.authService
      .isLoggedIn()
      .subscribe((response) => (this.loggedIn = response.auth));
  }

  logout(): void {
    this.authService
      .logout()
      .subscribe((response) => (this.loggedIn = response.auth));
  }
}
