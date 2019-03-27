import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { MessageService } from '../message.service';
import { UserService } from '../user.service';
import { UserState } from '../user';

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  user: UserState;
  businessUser: boolean = false;
  @Output() endSignUp: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) { this.userService.user.subscribe(user => this.user = user); }

  create(): void {
    if (this.userService.create(this.user)) {
      this.exitModal();
    }
  }

  setKind(kind: string) {
    this.user.kind = kind;
    this.businessUser = kind === 'business';
  }

  exitModal(): void {
    this.endSignUp.emit(true);
  }

  private log(message: string) {
    this.messageService.add(`Navbar(Auth)Component: ${message}`);
  }

  ngOnInit() {
  }
}
