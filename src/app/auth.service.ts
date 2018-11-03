import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
    console.log('auth service, setCurrentUser');
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
          console.log('POST Request is successful ', data);
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
          console.log('PUT Request is successful ', data);
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
      console.log('auth service constructor');
      const user = this.cookieService.get('current_user');
      this.setCurrentUser(user);
    }

}
