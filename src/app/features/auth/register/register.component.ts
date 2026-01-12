import {Component, inject} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../../core/services/auth.service';
import {UserRequest} from '../../../models/auth.model';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', Validators.required]
  });

  onSubmit(){
    if (this.registerForm.valid){
      this.authService.register(this.registerForm.value as UserRequest)
        .subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (err) => alert('Registration failed: ' + err.error.message)
        })
    }
  }
}
