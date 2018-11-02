import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NotGiphy';
  user = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService) {
    }

  doLogout() {
    this.authService.logout();
    console.log('app component logging out');
    this.router.navigateByUrl('/login');
  }

  updateUser(user) {
    this.user = user;
  }

  ngOnInit() {
    console.log('APP on init');
    this.authService.current_user.subscribe(user => {
      // FIXME? Some strange lifecycle issues around this subscription.
      // tslint:disable-next-line:max-line-length
      // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
      setTimeout(() => {
        this.user = user;
      });
    });
  }
}
