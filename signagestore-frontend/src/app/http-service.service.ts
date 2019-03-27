import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Angular2TokenService } from "angular2-token";

import {environment} from "../environments/environment";

import { State } from './state';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(
    private authToken: Angular2TokenService,
    private messageService: MessageService,
    private http: HttpClient
  ) { this.authToken.init(environment.token_auth_config); }

  post(url, body): Observable<State> {
    return this
              .http
              .post<State>(url, body, httpOptions)
              .pipe(
                tap(_ => this.log(`post to ${url} successful`)),
                catchError(this.handleError<State>('#post', new State))
              )
  }

  login(user): Observable<any> {
    return this.authToken.signIn(user)
  }

  logout(): Observable<any> {
    return this.authToken.signOut()
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.add(`HttpServiceService: ${message}`);
  }
}
