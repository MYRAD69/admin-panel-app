import { getAuth, signOut } from 'firebase/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor() {
    // try {
    //   const auth = getAuth();
    //   console.log(auth);
    // } catch (error) {
    //   console.log(error);
    // }
  }
}
