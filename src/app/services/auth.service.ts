import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiurl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  GetAll() {
    return this.http.get(this.apiurl);
  }

  GetByCode(code: any) {
    return this.http.get(this.apiurl + '/' + code);
  }

  ProceedRegister(inputData: any) {
    return this.http.post(this.apiurl, inputData);
  }

  UpdateUser(code: any, inputData: any) {
    return this.http.put(this.apiurl + '/' + code, inputData);
  }

  isLoggedIn() {
    console.log(localStorage.getItem('email'));
    return localStorage.getItem('email') != null;
  }

  getRole() {
    return localStorage.getItem('admin');
  }
}
