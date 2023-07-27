import { Injectable } from '@angular/core';
import { NavItem } from '../interfaces/nav-item';

@Injectable({
  providedIn: 'root'
})
export class NavListService {

  navList: NavItem[] = [
    {
      img: '../../assets/images/home.png',
      title: 'Home',
      link: '/home',
      isDropdown: false
    },
    {
      img: '../../assets/images/employees.png',
      title: 'Employees',
      link: '/employees',
      isDropdown: true,
      dropItems: [
        {
          img: 'assets/images/list.png',
          title: 'List Employees',
          link: '/employees/list',
          isDropdown: false
        }
      ]
    },
    {
      img: '../../assets/images/projects.png',
      title: 'Projects',
      link: '/projects',
      isDropdown: true,
      dropItems: [
        {
          img: 'assets/images/machine_learning.png',
          title: 'Machine Learning',
          link: '/projects/machine-learning',
          isDropdown: false
        },
        {
          img: 'assets/images/iot.png',
          title: 'IoT',
          link: '/projects/iot',
          isDropdown: false
        },
        {
          img: 'assets/images/web.png',
          title: 'Web Development',
          link: '/projects/web',
          isDropdown: false
        },
        {
          img: 'assets/images/add.png',
          title: 'Add Project',
          link: '/projects/add',
          isDropdown: false
        },
        {
          img: 'assets/images/list.png',
          title: 'List all Projects',
          link: '/projects/list',
          isDropdown: false
        }
      ]
    },
    {
      img: '../../assets/images/settings.png',
      title: 'Settings',
      link: '/settings',
      isDropdown: false
    }
  ];

  constructor() { }
}
