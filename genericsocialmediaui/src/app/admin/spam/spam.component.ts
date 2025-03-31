import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-spam',
  templateUrl: './spam.component.html',
  styleUrls: ['./spam.component.css'],
})
export class SpamComponent {
  constructor(private _messageService: MessageService) {}
  sendSpamMessage(userIds: string, message: string) {
    this._messageService
      .sendSpamMessage(userIds, message)
      .subscribe((response) => {});
  }
}
