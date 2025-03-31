import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { CompletedPayment } from '../models/CompletedPayment';
import { Payment } from '../models/Payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient, private _authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this._authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return headers;
  }

  getSuccessfulPayments(): Observable<CompletedPayment[]> {
    return this.http.get<CompletedPayment[]>(`${this.apiUrl}/payments`, {
      headers: this.getHeaders(),
    });
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/payments/all`, {
      headers: this.getHeaders(),
    });
  }
}
