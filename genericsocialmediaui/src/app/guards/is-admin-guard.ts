import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable()
export class IsAdminGuard {
  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  canActivate(): boolean {
    if (
      this._authService.loggedIn() &&
      this._userService.hasRole('Administrator')
    ) {
      return true;
    } else {
      this._router.navigate(['/profile']);
      return false;
    }
  }
}
