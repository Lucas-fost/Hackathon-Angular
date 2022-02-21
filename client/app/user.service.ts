import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable()
export class UserService {
  api = 'http://localhost:4000/';

  constructor(private http: HttpClient) {}

  // Client side code for User API interaction
  getMembers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}api/members`);
  }

  getMember(id: string): Observable<User> {
    return this.http.get<User>(`${this.api}api/members/member/${id}`);
  }
}
