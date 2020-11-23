import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, take, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  getFile(path: string, body?: any, header?: any): Observable<ArrayBuffer> {
    let opts = {
      params: new HttpParams(),
      headers: this.createHeader(header),
      responseType: 'arraybuffer',
    };
    if (body) {
      Object.getOwnPropertyNames(body).forEach((attr) => {
        opts.params = opts.params.append(attr, body[attr]);
      });
    }
    return this.http.get(environment.host + path, opts as any).pipe(
      take(1),
      catchError((e) => this.catchRequestError(e))
    );
  }
  get<T extends any>(path: string, body?: any, header?: any): Observable<T> {
    let opts = {
      params: new HttpParams(),
      headers: this.createHeader(header),
    };
    if (body) {
      Object.getOwnPropertyNames(body).forEach((attr) => {
        opts.params = opts.params.append(attr, body[attr]);
      });
    }
    return this.http.get<T>(environment.host + path, opts).pipe(
      take(1),
      catchError((e) => this.catchRequestError(e))
    ) as Observable<T>;
  }

  post<T extends any>(path: string, body?: any, header?: any): Observable<T> {
    return this.http
      .post<T>(environment.host + path, body || {}, {
        headers: this.createHeader(header),
      })
      .pipe(
        take(1),
        catchError((e) => this.catchRequestError(e))
      ) as Observable<T>;
  }
  delete<T extends any>(path: string, body?: any, header?: any): Observable<T> {
    let opts = {
      params: new HttpParams(),
      headers: this.createHeader(header),
    };
    if (body) {
      Object.getOwnPropertyNames(body).forEach((attr) => {
        opts.params = opts.params.append(attr, body[attr]);
      });
    }
    return this.http.delete<T>(environment.host + path, opts).pipe(
      take(1),
      catchError((e) => this.catchRequestError(e))
    ) as Observable<T>;
  }
  put<T extends any>(path: string, body?: any, header?: any): Observable<T> {
    return this.http
      .put<T>(environment.host + path, body || {}, {
        headers: this.createHeader(header),
      })
      .pipe(
        take(1),
        catchError((e) => this.catchRequestError(e))
      ) as Observable<T>;
  }

  catchRequestError(e: any) {
    if (e.status === 401) {
      this.router.navigate(['/login']);
      return throwError('');
    }

    let err = e.error.message || e.message;
    if (e.status === 0) {
      err = 'Servidor indisponível no momento.';
    }
    return throwError(err);
  }

  createHeader(header?: any) {
    let headers = new HttpHeaders();
    //   {
    //   'app-token': this.sessionService.getToken(),
    // }
    if (header) {
      Object.getOwnPropertyNames(header).forEach((attr) => {
        headers = headers.set(attr, header[attr]);
      });
    }

    return headers;
  }
  constructor(private http: HttpClient, private router: Router) {}
}
