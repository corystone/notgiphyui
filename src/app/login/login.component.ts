import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = '';
  password = '';
  current_user = '';

  constructor(
    private router: Router,
    private authService: AuthService) {}

  onSubmit(f: NgForm) {
    if (!f.valid) {
      console.log('Invalid login form submitted.');
      return;
    }
    if (this.authService.login(this.user, this.password)) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {
    this.authService.current_user.subscribe(user => this.user = user);
  }

}
