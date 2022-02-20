import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { User } from './user';
import { MEMBERS} from '../assets/members-list';

@Injectable()
export class AuthenticatorService {

  constructor(private route: Router, private http: HttpClient) { } 

  validate(email: string, password: string): User {
    return MEMBERS.find(member => member.email === email && member.password === password);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:4000/login', { email: email, password: password });
  }

  logout(): Observable<any> {
    return this.http.get('http://localhost:4000/logout');
  }

  isLoggedIn(): Observable<any> {
    return this.http.get('http://localhost:4000/api/authcheck');
  }

  signup(email: string, password: string, confirmPassword: string, name: string): Observable<any> {
    return this.http.post('http://localhost:4000/signup', { 
      email: email, 
      password: password, 
      confirmPassword: confirmPassword, 
      name: name 
    });
  }
}
