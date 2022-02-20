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
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMember();
  }

  getMember(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getMember(id)
      .subscribe(user => {
        this.user = user;
        this.user.profile.picture = this.user.profile.picture ? 
          this.user.profile.picture : 
          `https://gravatar.com/avatar/${this.user.email}?s=200&d=retro`;
      });
  }
}
