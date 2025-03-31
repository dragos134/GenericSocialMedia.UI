import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostsService } from 'src/app/services/posts.service';
interface DialogData {
  username: string;
}
@Component({
  selector: 'app-add-text',
  templateUrl: './add-text.component.html',
  styleUrls: ['./add-text.component.css'],
})
export class AddTextComponent {
  constructor(
    private _postService: PostsService,
    public dialogRef: MatDialogRef<AddTextComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  createPost(description: string) {
    this._postService.createPost(null, description).subscribe((response) => {
      console.log(response);
      this.dialogRef.close();
    });
  }
}
