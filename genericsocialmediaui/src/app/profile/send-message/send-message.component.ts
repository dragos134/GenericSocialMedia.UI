import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'src/app/services/message.service';

interface DialogData {
  username: string;
}

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css'],
})
export class SendMessageComponent {
  constructor(
    private _messageService: MessageService,
    public dialogRef: MatDialogRef<SendMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendMessage(message: string) {
    this._messageService
      .sendMessage(this.data.username as string, message)
      .subscribe((response) => {
        this.dialogRef.close();
        console.log(response);
      });
  }
}
