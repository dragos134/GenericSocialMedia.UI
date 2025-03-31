// auth.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';
import { trigger } from '@angular/animations';
import { RegisterUser } from '../models/RegisterUserForm';
import { Router } from '@angular/router';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private token: string = '';
  user: string = '';
  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
    private route: Router,
    private _notifiationService: NotificationsService
  ) {
    this.user = 'user';
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return headers;
  }

  getEmail() {
    const decodedToken: any = jwt_decode.jwtDecode(this.getToken());
    return decodedToken.email;
  }

  getChatSecret(): string | any {
    if (this.getToken() == '') return null;
    const decodedToken: any = jwt_decode.jwtDecode(this.getToken());
    return decodedToken.chat_secret as string;
  }

  getGender(): string {
    const decodedToken: any = jwt_decode.jwtDecode(this.getToken());
    return decodedToken.gender as string;
  }

  getUsername(): string {
    const decodedToken: any = jwt_decode.jwtDecode(this.getToken());
    return decodedToken.username as string;
  }

  setToken(token: string) {
    this.token = token;
    const decodedToken: any = jwt_decode.jwtDecode(token);
    const expire_time = (decodedToken.exp - decodedToken.nbf) / (24 * 3600);
    this._cookieService.set('user_token', token, expire_time);
  }

  getToken() {
    this.token = this._cookieService.get('user_token');
    return this.token;
  }

  loggedIn(): boolean {
    if (this.getToken() != '') return true;
    return false;
  }

  register(registerUserForm: any) {
    const url = `${environment.apiUrl}/register`;
    return this.http.post(url, registerUserForm);
  }

  login(email: string, password: string) {
    const body = { email, password };
    const url = `${environment.apiUrl}/authenticate`;
    return this.http.post(url, body, { responseType: 'text' });
  }

  refresh() {
    const url = `${environment.apiUrl}/refresh`;
    return this.http.get(url, {
      headers: this.getHeaders(),
      responseType: 'text',
    });
  }

  logout() {
    this._cookieService.delete('user_token');
    this._notifiationService.disconnect();
    this.route.navigate(['/login']);
  }

  canUseComchat() {
    const decodedToken: any = jwt_decode.jwtDecode(this.getToken());
    return decodedToken.canUseComchat as string;
  }
}
