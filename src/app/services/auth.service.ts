import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, pipe, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RestService } from './rest.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private session: SessionService,
    private router: Router,
    private rest: RestService
  ) {}

  logout() {
    this.rest
      .post('auth/exit', {})
      .pipe(
        map(() => {
          this.session.clearToken();
          this.router.navigate(['/login']);
        }),
        catchError((e) => {
          this.session.clearToken();
          this.router.navigate(['/login']);
          return throwError(e);
        })
      )
      .subscribe();
  }

  login(payload: { email: string; password: string }) {
    return this.rest.post<string>('auth', payload).pipe(
      map((result) => {
        this.session.setToken(result);
        this.router.navigate(['/home']);
        return result;
      }),
      catchError((e) => {
        this.session.clearToken();
        return throwError(e);
      })
    );
  }

  tokenIsValid(): Observable<boolean> {
    return new Observable((subscribe) => {
      this.isLoggedIn().subscribe(
        (result) => {
          if (!result) this.session.clearToken();
          subscribe.next(result);
        },
        (err) => {
          this.session.clearToken();
          subscribe.next(false);
          throw err;
        }
      );
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.rest.get('auth/loggedIn', {});
  }
}
