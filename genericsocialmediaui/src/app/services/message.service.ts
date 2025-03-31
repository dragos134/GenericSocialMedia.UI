import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Post } from '../models/Post';
import { Observable } from 'rxjs';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = environment.apiUrl + '/messages'; // replace with your API endpoint

  constructor(private http: HttpClient, private _authService: AuthService) {}
  private getHeaders(): HttpHeaders {
    const token = this._authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return headers;
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }

  sendMessage(user: string, message: string): Observable<Message> {
    const body = { username: user, content: message };
    return this.http.post<Message>(this.apiUrl, body, {
      headers: this.getHeaders(),
    });
  }

  sendSpamMessage(userIds: string, message: string): Observable<any> {
    const body = { idsList: userIds, content: message };
    return this.http.post<any>(`${this.apiUrl}/spam`, body, {
      headers: this.getHeaders(),
    });
  }

  getConversation(user: string): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl + `/user/${user}`, {
      headers: this.getHeaders(),
    });
  }

  updateMessage(messageObj: any): Observable<any> {
    console.log(messageObj);
    return this.http.put<any>(`${this.apiUrl}`, messageObj, {
      headers: this.getHeaders(),
    });
  }

  updateUnreadMessage(senderUsername: string): Observable<null> {
    return this.http.put<null>(`${this.apiUrl}/read/${senderUsername}`, null, {
      headers: this.getHeaders(),
    });
  }
}
