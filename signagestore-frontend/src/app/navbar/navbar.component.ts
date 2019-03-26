import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Angular2TokenService } from "angular2-token";
import { MessageService } from '../message.service';
import {environment} from "../../environments/environment";

import { UserShareService } from '../user-share.service';
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
    private authToken: Angular2TokenService,
    private messageService: MessageService,
    private sharedUser: UserShareService
  ) {
    // TODO: ADD SHARED STATE FOR AUTH'd
    this.authToken.init(environment.token_auth_config);
    this.sharedUser.user.subscribe(user => this.user = user);
    this.log("Navbar up");
  }

  toggleLoginDialogue(): void {
    this.loggingIn = !this.loggingIn;
  }

  login(event): void {
    this.log("login was called");
    this.authToken
        .signIn({email: this.user.email, password: this.user.password})
        .subscribe(
          res => {
            this.user.authenticated = true;
            this.updateSharedUser(this.user);
            this.log("Access Granted");
            console.log('auth response:', res);
            console.log('auth response headers: ', res.headers.toJSON()); //log the response header to show the auth token
            console.log('auth response body:', res.json()); //log the response body to show the user
          },
          err => {
            this.user.authenticated = false;
            this.updateSharedUser(new UserState);
            this.log("Access Denied");
            console.error('auth error:', err);
          }
        )
  }

  logout(event) {
    this.authToken
        .signOut()
        .subscribe(
          res => {
            this.user.authenticated = false;
            this.log("Successful Logout");
          },
          err => {
            this.user.authenticated = false;
            this.log("Logged out with errors");
          },
        )
    this.updateSharedUser(new UserState);
  }

  toggleSignUp($event): void {
    this.signingUp = !this.signingUp;
    this.loggingIn = !this.loggingIn;
  }

  private updateSharedUser(user: UserState) {
    this.sharedUser.updateState(user);
  }

  private log(message: string) {
    this.messageService.add(`Navbar(Auth)Component: ${message}`);
  }

  ngOnInit() {}

}
