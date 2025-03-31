import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegisterUser } from 'src/app/models/RegisterUserForm';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UniqueUsernameValidator } from 'src/app/common/async-validators/UniqueUsernameValidator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _notificationService: NotificationsService,
    private _router: Router,
    private _usernameValidator: UniqueUsernameValidator
  ) {}
  ngOnInit(): void {
    this.cols = window.innerWidth <= 800 ? 1 : 2;
  }
  cols: number = 2;
  hidePassword = true;
  hideConfirmPassword = true;
  registerForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    username: new FormControl('', {
      asyncValidators: [
        this._usernameValidator.validate.bind(this._usernameValidator),
      ],
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    email: new FormControl('', [Validators.required, Validators.email]),
    city: new FormControl(),
    gender: new FormControl(),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl(),
    tcAccepted: new FormControl(),
  });

  confirmPassword: string = '';
  register() {
    this._authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this._snackBar.open('Inscription réussie', undefined, {
          duration: 3000,
        });
        this._authService
          .login(
            this.registerForm.controls.email.value as string,
            this.registerForm.controls.password.value as string
          )
          .subscribe({
            next: (response) => {
              this._authService.setToken(response);
              this._notificationService.tryConnect();
              this._router.navigate(['/profile']);
            },
            error: (error) => {
              console.log(error);
            },
          });
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  onResize(event: Event) {
    this.cols =
      window.innerWidth <= 800 ||
      (window.innerWidth >= 1000 && window.innerWidth <= 1280)
        ? 1
        : 2;
  }
}
