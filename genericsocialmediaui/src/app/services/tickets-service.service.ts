import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ticket } from '../models/Ticket';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TicketsServiceService {
  private apiUrl = environment.apiUrl + '/support';
  constructor(private http: HttpClient, private _authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this._authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return headers;
  }

  createTicket(ticket: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ticket);
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl, { headers: this.getHeaders() });
  }
}
