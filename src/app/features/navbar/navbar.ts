import {Component, inject} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  public authService = inject(AuthService);

  onLogout(){
    this.authService.logout();
  }

}
