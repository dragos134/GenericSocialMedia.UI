import { Component } from '@angular/core';
import { Post } from '../models/Post';

@Component({
  selector: 'app-posts-wall',
  templateUrl: './posts-wall.component.html',
  styleUrls: ['./posts-wall.component.css'],
})
export class PostsWallComponent {
  posts: Post[] = [];
}
