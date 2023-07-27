import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userNameSubject = new BehaviorSubject<string>('');

  userName$ = this.userNameSubject.asObservable();

  setUserName(name: string): void {
    this.userNameSubject.next(name);
  }
}
