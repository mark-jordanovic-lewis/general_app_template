import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

import { UserState } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  createUrl: string = '/api/user/create';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { this.log('UserService up.'); }

  create(user: UserState): Observable<any> {
    return this.http
               .post<any>(this.createUrl, { user: user }, httpOptions)
               .pipe(
                 tap(response => this.log(response.message)),
                 catchError(this.handleError<any>('ProductService#product')));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`Navbar(Auth)Component: ${message}`);
  }
}
