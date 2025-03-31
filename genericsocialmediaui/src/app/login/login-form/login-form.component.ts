import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';

import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  buttonDisabled = false;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _notificationService: NotificationsService
  ) {}

  async login() {
    this.buttonDisabled = true;
    this._authService
      .login(
        this.loginForm.controls.email.value as string,
        this.loginForm.controls.password.value as string
      )
      .subscribe({
        next: (response) => {
          this._authService.setToken(response);
          this._notificationService.tryConnect();
          CometChatUIKit.login({ uid: this._authService.getChatSecret() })
            .then((x) => {
              console.log(x);
            })
            .catch(console.log);
          this._router.navigate(['/profile']);
        },
        error: (error) => {
          this.buttonDisabled = false;
          console.log(error);
        },
      });
  }
}
