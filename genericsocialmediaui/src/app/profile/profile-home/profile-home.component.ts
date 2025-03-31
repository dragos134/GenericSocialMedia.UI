import { Component, InputDecorator, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserProfile } from 'src/app/models/UserProfile';
import { PostsService } from 'src/app/services/posts.service';
import { environment } from 'src/environments/environment';
import { AddTextComponent } from '../add-text/add-text.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddPhotoComponent } from '../add-photo/add-photo.component';
import { Post } from 'src/app/models/Post';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css'],
})
export class ProfileHomeComponent implements OnInit {
  constructor(
    private _userDataService: UserDataService,
    private _postsService: PostsService,
    public dialog: MatDialog
  ) {}
  user: UserProfile = {} as UserProfile;
  photoSrc: string = '/assets/no_profile_photo.jpg';
  isUpdateUser: boolean = false;
  posts: Post[] = [];
  postDescription: string = '';
  ngOnInit() {
    this._userDataService.getCurrentUser().subscribe({
      next: (response) => {
        this.user = response as UserProfile;

        if (this.user.photoId != null) {
          this.photoSrc = `${environment.blobStorageUrl}${this.user.photoId}`;
        }

        console.log(this.user);
        this._postsService
          .getUserPosts(this.user.username)
          .subscribe((response) => {
            this.posts = response;
            console.log(response);
          });
      },
    });
  }
  profilePhotoInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files![0];
    this._userDataService.uploadPhoto(file).subscribe((response: any) => {
      this.photoSrc = response.photoUrl;
    });
  }

  postPhotoInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files![0];
    this._postsService
      .createPost(file, this.postDescription)
      .subscribe((response) => {
        // console.log(response);
      });
  }

  beginUpdateUsername() {
    this.isUpdateUser = true;
  }
  confirmUpdate() {
    this.isUpdateUser = false;
  }

  openAddTextDialog() {
    const dialogRef = this.dialog.open(AddTextComponent, {
      data: { username: this.user.username },
      panelClass: 'dialog-responsive',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openAddPhotoDialog() {
    const dialogRef = this.dialog.open(AddPhotoComponent, {
      data: { username: this.user.username },
      panelClass: 'dialog-responsive',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  getPhotoUrl(imageId: string) {
    return `${environment.blobStorageUrl}${imageId}`;
  }
}
