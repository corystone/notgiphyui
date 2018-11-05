import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /* AuthService handles talking to the auth endpoint for login/registration. It
   * also handles tracking the current logged in user state. */
  /* Like GifService, it could use a configurable endpoint and better error handling. */

  /* Also, there is probably a way to specify the domain for the cookie for the local dev
   * server as it doesn't play nice with cookies from the notgiphy.guitarzan.us domain.
   * The local (doesn't?) clear those auth cookies on logout. */

  private url = 'http://notgiphy.guitarzan.us:9999/api/auth';
  private _current_user_subject: BehaviorSubject<string>;
  private _current_user = '';

  get current_user() {
    return this._current_user_subject.asObservable();
  }

  getCurrentUser(): string {
    return this._current_user;
  }

  setCurrentUser(user: string) {
    this._current_user = user;
    this.cookieService.set('current_user', user, undefined, '/');
    this._current_user_subject.next(user);
  }

  logout() {
    this.cookieService.set('current_user', '', undefined, '/');
    this.cookieService.set('sessionid', '', undefined, '/');
    this.setCurrentUser('');
  }

  login(user: string, password: string): boolean {
    const body = new HttpParams().set('user', user).set('password', password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html, */*'});
    const httpOptions = {
      headers: headers,
      responseType: 'text' as 'text', // Seriously?
      withCredentials: true
    };
    this.http.post(this.url, body.toString(), httpOptions).subscribe(
      data => {
          this.setCurrentUser(user);
      },
      error => {
        this.setCurrentUser('');
      }
    );
    return true;
  }

  createUser(user: string, password: string): boolean {
    const body = new HttpParams().set('user', user).set('password', password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html, */*'});
    const httpOptions = {
      headers: headers,
      responseType: 'text' as 'text',
      withCredentials: true
    };
    this.http.put(this.url, body.toString(), httpOptions).subscribe(
      data => {
          this.setCurrentUser(user);
      },
      error => {
        this.setCurrentUser('');
      }
  );
    return true;
  }

  constructor(
    private http: HttpClient,
    private cookieService: CookieService) {
      this._current_user_subject = <BehaviorSubject<string>>new BehaviorSubject('');
      const user = this.cookieService.get('current_user');
      this.setCurrentUser(user);
    }

}
