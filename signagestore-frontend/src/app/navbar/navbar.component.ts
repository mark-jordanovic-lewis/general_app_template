import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MessageService } from '../message.service';


import { UserService } from '../user.service';
import { UserState } from '../user';

// let headers = new Headers({ 'Content-Type': 'application/json' });
// let options = new RequestOptions({ headers: headers });

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navTitle: string = 'signageStore.cool_slug';
  loggingIn: boolean = false;
  signingUp: boolean = false;
  user: UserState;

  constructor(
    private messageService: MessageService,
    private sharedUser: UserService
  ) {
    this.sharedUser.user.subscribe(user => this.user = user);
    this.log("Navbar up");
  }

  toggleLoginDialogue(): void {
    this.loggingIn = !this.loggingIn;
  }

  login(event) {
    this.log("logging in");
    this.sharedUser.login(this.user);
  }

  logout(event) {
    this.log("logging out");
    this.sharedUser.logout();
  }

  toggleSignUp($event): void {
    this.signingUp = !this.signingUp;
    this.loggingIn = !this.loggingIn;
  }

  private log(message: string) {
    this.messageService.add(`Navbar(Auth)Component: ${message}`);
  }

  ngOnInit() {}

}
