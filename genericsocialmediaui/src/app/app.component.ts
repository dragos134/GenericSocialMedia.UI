import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { NotificationsService } from './services/notifications.service';
import {
  CometChatThemeService,
  CometChatUIKit,
  MessagesStyle,
  fontHelper,
} from '@cometchat/chat-uikit-angular';
import { CometChat } from '@cometchat/chat-sdk-javascript';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public openMessages: boolean = false;
  public openMessageList: boolean = false;
  public openMessageHeader: boolean = false;
  public openMessageComposer: boolean = false;
  messagesStyle: MessagesStyle = {};
  public image: string =
    'https://data-us.cometchat.io/assets/images/avatars/captainamerica.png';
  withMessagesStyle: any = {
    display: 'flex',
    background: 'transparent',
    borderRadius: 'none',
    border: 'none',
    messageTextColor: 'rgba(20, 20, 20, 0.33)',
    messageTextFont: '700 22px Inter',
  };
  isMobileView: boolean = false;
  constructor(
    public userService: UserService,
    public authService: AuthService,
    public notificationService: NotificationsService,
    private themeService: CometChatThemeService
  ) {
    CometChat.getUser('4d30a449-c02d-490e-b91d-e2f27c616c9f')
      .then((user: CometChat.User) => {
        console.log(user);
        this.user = user;
      })
      .catch((error: CometChat.CometChatException) => {
        console.log(error);
      });
  }
  innerWidth!: number;
  /**
   * Checks when window size is changed in realtime
   */
  @HostListener('window:resize', [])
  onResize(): boolean {
    // try {
    //   this.innerWidth = window.innerWidth;
    //   if (this.innerWidth >= 320 && this.innerWidth <= 760) {
    //     this.isMobileView = true;
    //   } else {
    //     this.isMobileView = false;
    //   }
    // } catch (error) {}
    // if (this.isMobileView) {
    //   console.log('mobile');
    //   this.withMessagesStyle.width = '90vw';
    //   this.withMessagesStyle.height = '90vh';
    // }
    return true;
  }
  public user!: CometChat.User;
  comchatIsOn: boolean = false;
  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.authService.refresh().subscribe({
        next: (response) => {
          console.log(response);
          this.authService.setToken(response);
        },
      });
    }
  }
  title = 'Cumplir deseos';

  toggleComchat() {
    this.comchatIsOn = !this.comchatIsOn;
    if (this.comchatIsOn == true) {
      this.setMessagesStyle();
    }
  }

  setMessagesStyle() {
    // let defaultStyle: MessagesStyle = new MessagesStyle({
    //   width: '100%',
    //   height: '100%',
    //   background: this.themeService.theme.palette.getBackground(),
    //   borderRadius: 'none',
    //   border: 'none',
    //   messageTextColor: this.themeService.theme.palette.getAccent600(),
    //   messageTextFont: fontHelper(this.themeService.theme.typography.title1),
    // });
    // this.messagesStyle = {
    //   ...defaultStyle,
    //   ...this.messagesStyle,
    // };
  }
}
