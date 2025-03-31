import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserDataService } from 'src/app/services/user-data.service';
interface DialogData {
  userId: number;
}
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css',
})
export class DeleteUserComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _userDataService: UserDataService
  ) {}

  onNoClick(status: boolean): void {
    this.dialogRef.close(status);
  }
  softDeleteUser() {
    this._userDataService.softDeleteUser(this.data.userId).subscribe({
      next: (response) => {
        console.log('success');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  hardDeleteUser() {
    this._userDataService.hardDeleteUser(this.data.userId).subscribe({
      next: (response) => {
        console.log('success');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
