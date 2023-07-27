import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    if (state.url === '/employees/list' && authService.getRole() == 'false') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are not authorized to access this page',
      });
      return false;
    }
    console.log(authService.getRole());
    return true;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You are not logged in',
    });
    router.navigate(['/login']);
    return false;
  }
};
