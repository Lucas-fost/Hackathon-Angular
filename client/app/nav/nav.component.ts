import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticatorService } from "../authenticator.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(private authService: AuthenticatorService, private route: Router) {}

  ngOnInit() {
    this.authService
      .isLoggedIn()
      .subscribe((response) => (this.loggedIn = response.auth));
  }

  logout(): void {
    this.authService
      .logout()
      .subscribe((response) => {
        this.loggedIn = response.auth
        this.route.navigate(['/home'])
      });
  }
}
