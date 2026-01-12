import {inject, Injectable, PLATFORM_ID, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AuthRequest, UserRequest, AuthResponse} from '../../models/auth.model';
import {isPlatformBrowser} from '@angular/common';
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root'})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID)
  private apiUrl = 'http://localhost:8080/users';

  isAuthenticated = signal<boolean>(this.getInitialAuthState());
  currentUser = signal<any>(this.getDecodedUser());

  private getInitialAuthState(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('access_token');
    }
    return false;
  }

  private getDecodedUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          return jwtDecode(token);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  }

  register(userData: UserRequest) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: AuthRequest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('access_token', response.accessToken);
            const decodedUser = jwtDecode(response.accessToken)
            this.isAuthenticated.set(true);
            this.currentUser.set(decodedUser);
          }
        })
      );
  }

  logout(){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_info');
    }
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
