import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticatorService {

  api = 'http://localhost:4000/';

  constructor(private http: HttpClient) { } 

  // Client side code for Auth API integration
  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:4000/login', { 
      email: email, 
      password: password 
    });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.api}logout`);
  }

  isLoggedIn(): Observable<any> {
    return this.http.get(`${this.api}authcheck`);
  }

  signup(email: string, password: string, confirmPassword: string, name: string): Observable<any> {
    return this.http.post(`${this.api}signup`, { 
      email: email, 
      password: password, 
      confirmPassword: confirmPassword, 
      name: name 
    });
  }
}
