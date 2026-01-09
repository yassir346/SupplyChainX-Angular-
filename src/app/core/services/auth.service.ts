import {inject, Injectable, PLATFORM_ID, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {AuthRequest, UserRequest, AuthResponse} from '../../models/auth.model';
import {isPlatformBrowser} from '@angular/common';

@Injectable({ providedIn: 'root'})
export class AuthService {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID)
  private apiUrl = 'http://localhost:8080/users';

  isAuthenticated = signal<boolean>(this.getInitialAuthState());

  private getInitialAuthState(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('access_token');
    }
    return false;
  }

  register(userData: UserRequest) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: AuthRequest){
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('access_token', response.accessToken);
            this.isAuthenticated.set(true);
          }
        })
      );
  }

  logout(){
    localStorage.removeItem('access_token');
    this.isAuthenticated.set(false);
  }
}
