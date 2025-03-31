import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChatUser } from 'src/app/models/ChatUser';
import { Message } from 'src/app/models/Message';
import { UserProfile } from 'src/app/models/UserProfile';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { EditMessageComponent } from '../edit-message/edit-message.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  showChatUsers = true;
  private chatSkip = 0;
  private chatTake = 10;
  // private connection: HubConnection = {} as HubConnection;
  public chatUsers: ChatUser[] = [];
  public messages: Message[] = [];
  public selectedUser: ChatUser = {} as ChatUser;
  public message: string = '';
  public messageSyles: any = {
    sentMessage: true,
    receivedMessage: false,
  };

  @ViewChild('chatMessages')
  chatMessages!: ElementRef;
  constructor(
    private _messageService: MessageService,
    private _userDataService: UserDataService,
    private _authService: AuthService,
    private _notification: NotificationsService,
    public userService: UserService,
    public dialog: MatDialog
  ) {
    // this.connection = new HubConnectionBuilder()
    //   .withUrl(`${environment.backendUrl}/chatHub`)
    //   .build();
  }

  async ngOnInit() {
    this._notification.setNoOfMessages(0);
    const users = this._userDataService
      .getPaginatedChatUsers(this.chatSkip, this.chatTake)
      .subscribe({
        next: (response) => {
          this.chatSkip += 10;
          this.chatTake += 10;
          this.chatUsers = response;
          if (this.chatUsers.length > 0) {
            this.onChangeChat(this.chatUsers[0], true);
          }
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    const chatSecret = this._authService.getChatSecret();
    this._notification.notificationConnection.on(
      `${chatSecret}`,
      (user: string, message: string, messageId: number) => {
        if (user == this.selectedUser.username) {
          var messageIndex = this.messages.findIndex(
            (msg) => msg.id == messageId
          );
          if (messageIndex > -1) {
            this.messages[messageIndex].content = message;
            return;
          }
          const newMessage: Message = {
            id: messageId,
            content: message,
            senderUsername: user,
            senderFullname: '',
            receiverUsername: this._authService.getUsername(),
            receiverFullname: '',
            isRead: false,
            sentAt: new Date(),
          };
          this.messages.push(newMessage);
          setTimeout(() => {
            this.scrollMessages();
          }, 1);
        }
        var userIndex = this.chatUsers.findIndex(
          (chatUser) => chatUser.username == user
        );
        // trim the message
        this.scrollMessages();
        this.chatUsers[userIndex].lastMessage = this.trimMessage(message);
        this.moveUserFirst(this.chatUsers[userIndex]);
        console.log(this.selectedUser.username);
        console.log(this.chatUsers[userIndex].username);
        if (this.selectedUser.username != this.chatUsers[userIndex].username) {
          console.log('unread updated asd');
          this.chatUsers[userIndex].noOfUnread += 1;
        }
      }
    );

    // try {
    //   await this.connection.start();
    //   this.connection.send('goOnline', '123');
    //   console.log('Connected to signalr hub');
    // } catch (error) {
    //   console.error('Failed to connect');
    // }
  }

  sendMessage(message: string) {
    if (message == '') return;
    const sentMessage: Message = {
      id: 0,
      content: message,
      senderUsername: this._authService.getUsername(),
      senderFullname: '',
      receiverUsername: this.selectedUser.username,
      receiverFullname: '',
      isRead: false,
      sentAt: new Date(),
    };
    this.messages.push(sentMessage);
    this.moveUserFirst(this.selectedUser);
    this._messageService
      .sendMessage(this.selectedUser.username, message)
      .subscribe((response) => {
        this.messages[this.messages.length - 1].id = response.id;
        this.scrollMessages();
      });
  }

  onChangeChat(user: ChatUser, isInitialSelect: boolean = false) {
    if (window.innerWidth < 800) {
      this.toggleChat();
    }
    this.selectedUser = user;
    this._messageService.updateUnreadMessage(user.username).subscribe({
      next: (res) => {
        if (!isInitialSelect) this.selectedUser.noOfUnread = 0;
      },
      error: (err) => {},
    });

    this._messageService
      .getConversation(this.selectedUser.username)
      .subscribe((response) => {
        this.messages = response;
        setTimeout(() => {
          this.scrollMessages();
        }, 1);
      });
  }

  trimMessage(message: string): string {
    if (message.length > 20) {
      return `${message.substring(0, 20)}...`;
    }
    return message;
  }

  onChatUsersScroll(event: any) {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      this._userDataService
        .getPaginatedChatUsers(this.chatSkip, this.chatTake)
        .subscribe({
          next: (response) => {
            this.chatSkip += 10;
            this.chatTake += 10;
            this.chatUsers = this.chatUsers.concat(response);
          },
          error: (err) => {
            console.log(err.error.message);
          },
        });
    }
  }

  private scrollMessages() {
    const elem = this.chatMessages.nativeElement as HTMLDivElement;
    elem.scrollTop = 11 * elem.scrollHeight;
  }

  getPhotoUrl(photoId: string) {
    if (photoId == undefined) {
      return '../../../assets/no-image.jpg';
    }
    return `${environment.blobStorageUrl}${photoId}`;
  }

  private moveUserFirst(user: ChatUser) {
    var userIndex = this.chatUsers.findIndex(
      (chatUser) => chatUser.username == user.username
    );
    this.chatUsers.splice(userIndex, 1);
    this.chatUsers.unshift(user);
  }

  openEditMessageDialog(messageId: number, content: string) {
    const dialogRef = this.dialog.open(EditMessageComponent, {
      data: { messageId: messageId, message: content },
      panelClass: 'dialog-responsive',
    });

    dialogRef.afterClosed().subscribe((result) => {
      var messageIndex = this.messages.findIndex((msg) => msg.id == messageId);
      this.messages[messageIndex].content = result;
    });
  }

  toggleChat() {
    this.showChatUsers = !this.showChatUsers;
    console.log('slide');
  }
}
