import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticatorService } from '../authenticator.service';

@Component({
  providers: [AuthenticatorService],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = ''
  password: string = ''


  constructor(private authenticator: AuthenticatorService, private route: Router) { }

  ngOnInit(): void {
  }

  handleLogin(event: any, value: any): void {
    event.preventDefault()
    this.authenticator.login(this.email, this.password)
      .subscribe(response => {
        this.route.navigate(['/members'])
      })
  }

}
