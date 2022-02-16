import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { User } from './user';
import { MEMBERS} from '../assets/members-list';

@Injectable()
export class AuthenticatorService {

  private currentUser: User = {id: 99, name: '', password: '', email: ''}

  constructor(private route: Router, private http: HttpClient) { } 

  validate(email: string, password: string): User {
    return MEMBERS.find(member => member.email === email && member.password === password)!
  }

  login(email: string, password: string): void {
    // const signedUser = this.validate(email, password)
    // if (signedUser) this.currentUser = signedUser
    // this.route.navigate(['/members'])

    this.http.post('http:localhost:4000/login', JSON.stringify({ email: email, password: password }))
  }



  isLoggedIn(): Observable<boolean> {
    return of(this.currentUser.email ? true : false)
  }
}
