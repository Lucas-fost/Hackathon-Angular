import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http'

import { User } from "./user";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getMembers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:4000/api/members')
  }

  getMember(id: string): Observable<User> {
    return this.http.get<User>(`http://localhost:4000/api/members/member/${id}`)
  }
}
