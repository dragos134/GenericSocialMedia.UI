import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { RecruitedUser } from '../models/RecruitedUser';
import { User } from '../models/User';
import { UserProfile } from '../models/UserProfile';
import { ChatUser } from '../models/ChatUser';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private apiUrl = environment.apiUrl + '/users'; // replace with your API endpoint

  constructor(private http: HttpClient, private _authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this._authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return headers;
  }

  getCurrentUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.apiUrl + '/current', {
      headers: this.getHeaders(),
    });
  }

  updateUser(user: any): Observable<RecruitedUser> {
    return this.http.put<RecruitedUser>(this.apiUrl + '/recruited', user, {
      headers: this.getHeaders(),
    });
  }

  getUserByUsername(username: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.apiUrl + `/${username}`, {
      headers: this.getHeaders(),
    });
  }

  uploadPhoto(photo: any): Observable<any> {
    let formData = new FormData();
    formData.append('File', photo);
    return this.http.post<User>(this.apiUrl + '/current/photo', formData, {
      headers: this.getHeaders(),
    });
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/registered', {
      headers: this.getHeaders(),
    });
  }

  getRecruitedUsers(): Observable<RecruitedUser[]> {
    return this.http.get<RecruitedUser[]>(this.apiUrl + '/recruited', {
      headers: this.getHeaders(),
    });
  }

  addRecruitedUser(email: string): Observable<RecruitedUser> {
    const headers = this.getHeaders();
    const body = { email: email };

    const req = this.http.post<RecruitedUser>(this.apiUrl, body, {
      headers: headers,
    });

    return req;
  }

  getPaginatedChatUsers(skip: number, take: number): Observable<ChatUser[]> {
    const headers = this.getHeaders();
    return this.http.get<ChatUser[]>(
      `${this.apiUrl}/paginatedchatusers?skip=${skip}&take=${take}`,
      {
        headers: headers,
      }
    );
  }

  getChatUsers(): Observable<ChatUser[]> {
    const headers = this.getHeaders();
    return this.http.get<ChatUser[]>(this.apiUrl + '/chatusers', {
      headers: headers,
    });
  }

  searchUsers(username: string): Observable<ChatUser[]> {
    const headers = this.getHeaders();
    return this.http.get<ChatUser[]>(this.apiUrl + `/chatusers/${username}`, {
      headers: headers,
    });
  }

  checkUserEmail(email: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/check-email/${email}`, {
      headers: headers,
    });
  }

  checkUsername(username: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/check-username/${username}`, {
      headers: headers,
    });
  }

  softDeleteUser(userId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/recruited/${userId}`, {
      headers: headers,
    });
  }
  hardDeleteUser(userId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/recruited/${userId}/hard`, {
      headers: headers,
    });
  }
}
