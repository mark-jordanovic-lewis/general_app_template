import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { MessageService } from '../message.service';
import { UserService } from '../user.service';
import { UserShareService } from '../user-share.service';
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
    private creationService: UserService,
    private sharedUser: UserShareService
  ) { this.sharedUser.user.subscribe(user => this.user = user); }

  create(): void {
    this.creationService
        .create(this.user)
        .subscribe(
          success => {
            this.log(`UserCreate success: ${success.message}`);
            success.user.authenticated = true;
            this.sharedUser.updateState(success.user);
            this.exitModal();
          },
          error => this.log(`UserCreate failed: ${error.message}`)
        )
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
