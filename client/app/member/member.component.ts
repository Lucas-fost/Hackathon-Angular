import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit {
  user: User | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMember();
  }

  getMember(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getMember(id)
      .subscribe(user => this.user = user)
  }
}
