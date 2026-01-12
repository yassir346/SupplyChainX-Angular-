import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {AuthRequest} from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  onLogin(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value as AuthRequest).subscribe({
        next: (response) => {
          this.router.navigate(['/procurement/materials']);
        },
        error: () => alert('Email ou mot de passe incorrect')
      });
    }
  }
}
