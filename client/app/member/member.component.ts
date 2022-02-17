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
    console.log(id)
    this.userService.getMember(id)
      .subscribe(user => {
        console.log(user)
        this.user = user
        // const md5 = (<any>crypto).createHash('md5').update(this.user.email).digest('hex');
        this.user.profile.picture = `https://gravatar.com/avatar/${this.user.email}?s=200&d=retro`
      })
  }
}
