import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RecruitedUser } from 'src/app/models/RecruitedUser';
import { UserDataService } from 'src/app/services/user-data.service';
interface DialogData {
  user: RecruitedUser;
}
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  editUserForm = new FormGroup({
    email: new FormControl(this.data.user.email, [
      Validators.required,
      Validators.email,
    ]),
    firstName: new FormControl(this.data.user.firstName),
    lastName: new FormControl(this.data.user.lastName),
    subscriptionId: new FormControl(this.data.user.subscriptionId.toString()),
    id: new FormControl(this.data.user.id),
  });
  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _userDataService: UserDataService
  ) {}

  onNoClick(): void {
    console.log('on no click');
    this.dialogRef.close(this.data.user);
  }
  editUser() {
    const jsonForm = JSON.stringify(this.editUserForm.value);
    const test = {
      id: this.editUserForm.controls['id'].value,
      firstName: this.editUserForm.controls['firstName'].value,
      lastName: this.editUserForm.controls['lastName'].value,
      subscriptionId: this.editUserForm.controls['subscriptionId'].value,
      email: this.editUserForm.controls['email'].value,
    };
    console.log(test);
    this._userDataService.updateUser(test).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
