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
  loggedIn: boolean = false;

  constructor(private authService: AuthenticatorService) {}

  ngOnInit() {
    this.subscribe();
  }

  subscribe(): void {
    this.authService.isLoggedIn().subscribe((state) => {
      this.updateState(state);
    })
  }

  updateState(state: boolean) {
    this.loggedIn = state;
  }
}
