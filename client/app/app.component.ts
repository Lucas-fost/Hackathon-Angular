import { Component } from '@angular/core';

import { AuthenticatorService } from './authenticator.service';

@Component({
  providers: [AuthenticatorService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-attempt';
  loggedIn: boolean;

  constructor(private authService: AuthenticatorService) {}

  ngOnInit() {
    this.authService.isLoggedIn()
      .subscribe(response => this.loggedIn = response.auth);
  }

  logout(): void {
    this.authService.logout()
      .subscribe(response => this.loggedIn = response.auth);
  }
}
