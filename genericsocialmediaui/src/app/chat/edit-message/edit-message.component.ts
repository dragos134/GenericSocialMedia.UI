import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Message } from 'src/app/models/Message';
import { MessageService } from 'src/app/services/message.service';
import { UserDataService } from 'src/app/services/user-data.service';
interface DialogData {
  messageId: number;
  message: Message;
}
@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrl: './edit-message.component.css',
})
export class EditMessageComponent {
  editMessageForm = new FormGroup({
    message: new FormControl(this.data.message, [
      Validators.required,
      Validators.email,
    ]),
    id: new FormControl(this.data.messageId),
  });
  constructor(
    public dialogRef: MatDialogRef<EditMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _messageService: MessageService
  ) {}

  onNoClick(): void {
    this.dialogRef.close(this.editMessageForm.controls['message'].value);
  }
  editMessage() {
    this._messageService.updateMessage(this.editMessageForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.onNoClick();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
