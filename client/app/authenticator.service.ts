import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticatorService {

  constructor(private http: HttpClient) { } 

  // Client side code for Auth API integration
  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:4000/login', { 
      email: email, 
      password: password 
    });
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
