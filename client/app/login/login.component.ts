import { Component, OnInit } from '@angular/core';

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


  constructor(private authenticator: AuthenticatorService) { }

  ngOnInit(): void {
  }

  handleLogin(event: any, value: any): void {
    event.preventDefault()
    console.log('submitted')
    this.authenticator.login(this.email, this.password)
  }

}
