import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UserState } from './user';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class UserShareService {
  public user: BehaviorSubject<UserState> = new BehaviorSubject<UserState>(new UserState());

  constructor(private messageService: MessageService){}

  updateState(user: UserState): void {
    this.update(user);
  }

  private update(state: UserState): void {
    this.log(`UserShareService#update: ${state.email}, auth'd: ${state.authenticated}`)
    this.user.next(state);
  }

  private log(message) {
    this.messageService.add(message);
  }
}
