import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from '../models/Subscription';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private apiUrl = environment.apiUrl + '/subscriptions';
  constructor(private http: HttpClient, private _authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this._authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return headers;
  }

  getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }
}
