import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticatorService } from '../authenticator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;
  confirmPassword: string;
  name: string;

  constructor(
    private auth: AuthenticatorService,
    private route: Router
  ) {}

  ngOnInit(): void {
  }

  handleSignup(event: any): void {
    event.preventDefault();
    this.auth.signup(this.email, this.password, this.confirmPassword, this.name)
      .subscribe(response => {
        console.log(response || 'signup doesn\'t return a response');
        this.route.navigate(['/members']);
      });
  }
  
}
