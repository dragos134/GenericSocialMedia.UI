import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/models/UserProfile';
import { PostsService } from 'src/app/services/posts.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { SendMessageComponent } from '../send-message/send-message.component';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private _userDataService: UserDataService,
    private _postsService: PostsService,
    public _authService: AuthService,
    private route: ActivatedRoute,
    private navRoute: Router,
    public dialog: MatDialog
  ) {}
  // user$: Observable<UserProfile> | undefined;
  username: string | undefined;
  user: UserProfile = {} as UserProfile;
  posts: Post[] = [];
  public profilePhotoUrl: string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.username = param.get('username') as string;
      return this._userDataService
        .getUserByUsername(this.username)
        .subscribe((response) => {
          this.user = response as UserProfile;
          this._postsService
            .getUserPosts(this.user.username)
            .subscribe((response) => {
              this.posts = response;
              console.log(response);
            });
          if (this.user.username == this._authService.getUsername()) {
            this.navRoute.navigate(['/profile']);
          }

          if (this.user.photoId == null) {
            this.profilePhotoUrl = '/assets/no_profile_photo.jpg';
            return;
          }
          this.profilePhotoUrl = `${environment.blobStorageUrl}${this.user.photoId}`;
        });
    });
  }

  openSendMessageDialog() {
    const dialogRef = this.dialog.open(SendMessageComponent, {
      data: { username: this.username },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  getPhotoUrl(imageId: string) {
    return `${environment.blobStorageUrl}${imageId}`;
  }
}
