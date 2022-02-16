import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http'
import { of } from "rxjs/observable/of";

import { User } from "./user";
import { MEMBERS } from "../assets/members-list";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getMembers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:4000/api/members')
  }

  getMember(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:4000/api/members/${id}`)
  }
}
