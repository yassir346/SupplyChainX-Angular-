import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  let authReq = req;

  if (isBrowser) {
    const token = localStorage.getItem('access_token');
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        if (isBrowser) {
          localStorage.removeItem('access_token');
        }
        router.navigate(['/login']);
      }

      if (error.status === 403) {
        console.error('Accès refusé : Rôle insuffisant pour cette action.');
      }

      return throwError(() => error);
    })
  );
};
