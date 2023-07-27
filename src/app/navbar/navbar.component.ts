import { Component, Output, EventEmitter, ViewChild, ElementRef, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { NavListService } from '../services/nav-list.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit, OnDestroy {


  @Output() navbarEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('dropdownMenu') dropdownMenu: ElementRef;
  @ViewChild('navigation') navigation: ElementRef;

  navItems = this.navListService.navList;
  userName: string = '';
  private userNameSubscription: Subscription;
  isDropdownOpen: boolean = false;
  isNavbarVisible: boolean = false;
  isHidden = false;

  constructor(private navListService: NavListService, private userService: UserService) {
    this.userNameSubscription = this.userService.userName$.subscribe(
      (name) => (this.userName = name || 'unknown')
    );
  }

  ngAfterViewInit(): void {
    const w = window.innerWidth;
    if (w <= 440) {
      this.dropdownMenu.nativeElement.setAttribute('hidden', '');
      this.isHidden = true;
    }
    if (localStorage.getItem('name') !== null) {
      this.userService.setUserName(localStorage.getItem('name') || 'unknown');
    }
  }

  ngOnDestroy(): void {
    this.userNameSubscription.unsubscribe();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    localStorage.clear();
    this.userService.setUserName('unknown');
    this.toggleDropdown();
  }

  toggleNavbar() {
    this.isNavbarVisible = !this.isNavbarVisible;
    this.navbarEvent.emit(this.isNavbarVisible);
    const w = window.innerWidth;
    if (w <= 440) {
      if (!this.isNavbarVisible) {
        this.dropdownMenu.nativeElement.setAttribute('hidden', '');
        this.isHidden = true;
      }
      else {
        this.dropdownMenu.nativeElement.removeAttribute('hidden');
        this.isHidden = false;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.dropdownMenu.nativeElement.contains(event.target) && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
    const w = window.innerWidth;
    if (!this.navigation.nativeElement.contains(event.target) && !this.isNavbarVisible && w <= 440) {
      this.toggleNavbar();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const w = window.innerWidth;
    if (w <= 220 || (w <= 440 && !this.isNavbarVisible)) {
      this.dropdownMenu.nativeElement.setAttribute('hidden', '');
      this.isHidden = true;
    }
    else {
      this.dropdownMenu.nativeElement.removeAttribute('hidden');
      this.isHidden = false;
    }
  }
}
