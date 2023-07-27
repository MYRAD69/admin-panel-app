import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';

var firebaseConfig = {
  projectId: 'word-cards-c564b',
  appId: '1:1010686458159:web:cc091f8b986cebd77ac9da',
  databaseURL: 'https://word-cards-c564b-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'word-cards-c564b.appspot.com',
  apiKey: 'AIzaSyDNdSCjw5-PQbnUHLCmj7W2aJ_Ncdf4xFI',
  authDomain: 'word-cards-c564b.firebaseapp.com',
  messagingSenderId: '1010686458159',
  measurementId: 'G-QBFTRR88X6',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    const app = initializeApp(firebaseConfig);
    console.log(app);
  }

  isNavbarVisible: boolean = false;

  handleNavbarEvent(isVisible: boolean) {
    this.isNavbarVisible = isVisible;
    // Do something with the value of isVisible
  }
}
