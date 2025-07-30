import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService : NotificationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/area-riservata']);
    }
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/area-riservata']);
      },
      error: (err:any) => {
        this.isLoading = false;
        console.error('Login failed', err.error.message);
        var message=  err.error.message ==="Bad credentials" ? "Credenziali errate, riprova" : err.error.message
        this.notificationService.showErrorMessage(message)
      }
    });
  }
}
