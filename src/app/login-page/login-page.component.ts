import Swal from 'sweetalert2';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  myForm: FormGroup;

  userData: any;

  loading = false;
  success = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]],
    });
    // localStorage.clear();
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }
  if(this: any) {
    this.myForm.valueChanges.subscribe(console.log);
    this.myForm.get('email').valueChanges.subscribe(console.log);
  }

  // basic form firebase tutorial

  async submitHandler() {

    this.loading = true;
    const formValue = this.myForm.value;
    const email = this.email?.value;
    const password = this.password?.value;

    if (this.myForm.valid) {
      this.auth.GetByCode(email).subscribe((result: any) => {
        this.userData = result;
        console.log(result);
        if (password === this.userData.password) {
          if (this.userData.isActive) {
            Swal.fire({
              title: 'Login successful',
              text: 'Welcome to the admin panel',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            localStorage.setItem('email', this.userData.id);
            localStorage.setItem('admin', this.userData.isAdmin);
            localStorage.setItem('name', this.userData.name);
            this.userService.setUserName(this.userData.name);
            this.router.navigate(['/home']);
          }
          else {
            Swal.fire({
              title: 'User is not active',
              text: 'Please contact admin',
              icon: 'warning',
              confirmButtonText: 'OK'
            });
          }
        }
        else {
          Swal.fire({
            title: 'Incorrect password',
            text: 'Please try again',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
        }
      });
    }

    console.log('submitting: ', formValue);
    this.loading = false;
  }

}
