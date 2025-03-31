import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  isLogin: boolean = true;
}
