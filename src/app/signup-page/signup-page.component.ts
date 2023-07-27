import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  myForm: FormGroup;

  userData: any;

  loading = false;
  success = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    // sessionStorage.clear();
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
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]*$')
      ]],
    });
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }
  get name() {
    return this.myForm.get('name');
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
    const name = this.name?.value;

    if (this.myForm.valid) {
      this.auth.ProceedRegister({ "id": email, "name": name, "password": password, "isActive": true, "isAdmin": false }).subscribe((result: any) => {
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully registered!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.router.navigate(['/login']);
      });
    }

    console.log('submitting: ', formValue);
    this.loading = false;
  }

}
