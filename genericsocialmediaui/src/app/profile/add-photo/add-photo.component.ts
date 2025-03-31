import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostsService } from 'src/app/services/posts.service';
interface DialogData {
  username: string;
}
@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css'],
})
export class AddPhotoComponent {
  constructor(
    private _postService: PostsService,
    public dialogRef: MatDialogRef<AddPhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  photoSrc!: string;
  uploadedPhoto!: File;
  onNoClick(): void {
    this.dialogRef.close();
  }

  postPhotoInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files![0];
    this.uploadedPhoto = file;
    this.photoSrc = URL.createObjectURL(file);
  }

  createPost(postDescription: string) {
    console.log(postDescription);
    if (postDescription == null) {
      postDescription = '';
    }
    if (this.uploadedPhoto == undefined) {
      return;
    }
    this._postService
      .createPost(this.uploadedPhoto, postDescription)
      .subscribe((response) => {
        this.dialogRef.close();
      });
  }
}
