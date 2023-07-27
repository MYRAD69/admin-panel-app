import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NavItem } from '../interfaces/nav-item';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css']
})
export class NavbarItemComponent {

  @Input() item: NavItem = { img: '', title: '', link: '', isDropdown: false };

  @ViewChild('dropdownMenu') dropdownMenu: ElementRef;

  shown = false;

  constructor() {
  }

  toggleDropdown() {
    if (this.dropdownMenu) {
      this.dropdownMenu.nativeElement.classList.toggle('show');
      this.shown = !this.shown;
    }
  }
}
