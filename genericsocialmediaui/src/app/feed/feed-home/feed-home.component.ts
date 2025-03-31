import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { NotificationsService } from 'src/app/services/notifications.service';
import { PostsService } from 'src/app/services/posts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feed-home',
  templateUrl: './feed-home.component.html',
  styleUrls: ['./feed-home.component.css'],
})
export class FeedHomeComponent implements OnInit {
  posts: Post[] = [];
  constructor(
    private _postsService: PostsService,
    private _router: Router,
    private _notification: NotificationsService
  ) {}
  ngOnInit(): void {
    this._postsService.getPosts().subscribe((response: Post[]) => {
      this.posts = response;
    });
  }

  getBlobUrlFromId(photoId: string) {
    return `${environment.blobStorageUrl}${photoId}`;
  }

  getProfileRoute(username: string) {
    return `/profile/${username}`;
  }
}
