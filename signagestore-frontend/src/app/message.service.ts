import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MessageService {
  private inbox: string[];
  public message$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.inbox);


  constructor() {
    this.clear();
    this.add("MessageService up");
  }

  add(message: string) {
    this.inbox.push(message);
    this.message$.next(this.inbox);
  }

  clear() {
    this.inbox = [];
    this.message$.next(this.inbox);
  }
}
