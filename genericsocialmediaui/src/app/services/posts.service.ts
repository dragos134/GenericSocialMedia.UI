import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Post } from '../models/Post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiUrl = environment.apiUrl + '/posts'; // replace with your API endpoint

  constructor(private http: HttpClient, private _authService: AuthService) {}
  private getHeaders(): HttpHeaders {
    const token = this._authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return headers;
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  createPost(photo: any, description: string): Observable<any> {
    let formData = new FormData();
    formData.append('Photo', photo);
    formData.append('Description', description);
    console.log(this.apiUrl);
    return this.http.post<Post>(this.apiUrl, formData, {
      headers: this.getHeaders(),
    });
  }

  getUserPosts(username: string): Observable<Post[]> {
    console.log(`${this.apiUrl}/${username}`);
    return this.http.get<Post[]>(`${this.apiUrl}/${username}`, {
      headers: this.getHeaders(),
    });
  }
}
