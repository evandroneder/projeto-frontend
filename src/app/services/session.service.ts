import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  clearToken() {
    localStorage.setItem('app-token', '');
  }

  setToken(token: string): void {
    localStorage.setItem('app-token', token);
  }
  getToken(): string {
    return localStorage.getItem('app-token') || '';
  }
}
