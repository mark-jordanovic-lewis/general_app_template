import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

import { HttpServiceService } from './http-service.service';
import { UserState } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // TODO: ON UPDATE APPLY HEADERS
  public user: BehaviorSubject<UserState> = new BehaviorSubject<UserState>(new UserState());
  private _user: UserState;
  createUrl: string = '/api/user/create';

  constructor(
    private http: HttpServiceService,
    private messageService: MessageService
  ) { this.user.subscribe(user => this._user = user); }

  create(user: UserState): boolean {
    if (this._user.authenticated) { return false }
    this.http.post(this.createUrl, user)
      .subscribe(
        success => {
          this.log(`UserCreate success: ${success.message}`);
          success.user.authenticated = true;
          this.update(success.user);
        },
          error => this.log(`UserCreate failed: ${error.message}`)
        );
    return this._user.authenticated; // this does not mean we have their headers!, also race condition
  }

  login(user: UserState): boolean {
    var login_json = { email: user.email, password: user.password };
    this.http.login(login_json)
      .subscribe(
        success => {
          this._user.authenticated = true;
          this.update(this._user);
          this.log("Access Granted");
          console.log('response: ', success);
        },
        err => {
          this.update(new UserState);
          this.log("Access Denied");
          console.error('auth error:', err);
        }
      )
    return this._user.authenticated;
  }

  logout(): void {
    this.http.logout()
      .subscribe(
        res => { this.log("Successful Logout"); },
        err => { this.log("Logged out with errors"); },
      )
    this.update(new UserState());
  }

  private update(state: UserState): void {
    this.log(`UserShareService#update: ${state.email}, auth'd: ${state.authenticated}`)
    this.user.next(state);
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}
