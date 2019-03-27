import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { UserService } from '../user.service';
import { UserState } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  content: string = 'user';
  user: UserState;

  constructor(
    private messageService: MessageService,
    private sharedUser: UserService
  ) { this.sharedUser.user.subscribe(user => this.user = user); }

  setContent(content: string): void {
    this.content = content;
  }

  ngOnInit() {
  }

}
