import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoggedInAuthGuard {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      this._router.navigate(['/profile']);
      return false;
    } else {
      return true;
    }
  }
}
