// user.service.ts
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userRoles: string[] = [];
  constructor(private _cookieService: CookieService) {}
  setUserRoles(token: string): void {
    const decodedToken: any = jwt_decode.jwtDecode(token);

    // Extract roles from the decoded token and store them
    this.userRoles = decodedToken.roles;
  }

  hasRole(role: string): boolean {
    const token = this._cookieService.get('user_token');
    if (token == '') {
      return false;
    }
    const decodedToken: any = jwt_decode.jwtDecode(token);

    // Extract roles from the decoded token and store them
    this.userRoles = decodedToken.roles;
    return this.userRoles.includes(role);
  }
}
