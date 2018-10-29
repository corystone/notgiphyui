import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = '';
  password = '';

  constructor(
    private router: Router,
    private authservice: AuthService) {}

  onSubmit(f: NgForm) {
    if (!f.valid) {
      console.log('Invalid register form submitted.');
      return;
    }
    if (this.authservice.createUser(this.user, this.password)) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {}

}
