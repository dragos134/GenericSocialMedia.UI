import { Component, OnInit } from '@angular/core';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
})
export class PaymentSuccessComponent implements OnInit {
  constructor(private _authService: AuthService) {}
  error: string = '';
  authKey: string = '8a5a9499e3adff4f5313cf14d06861aa7bfff1af';
  inProgress: boolean = true;
  ngOnInit(): void {
    const name: string = this._authService.getUsername();
    const uid: string = this._authService.getChatSecret();
    var user = new CometChat.User(uid);
    console.log(name);
    console.log(uid);
    user.setName(name);
    CometChatUIKit.createUser(user).then(
      (user) => {
        this.loginToDashboard((user as CometChat.User).getUid());
        this._authService.refresh().subscribe({
          next: (response) => {
            console.log(response);
            this._authService.setToken(response);
          },
        });
      },
      (error) => {
        this.inProgress = false;
        this.error = error.message;
        console.log('error', error);
      }
    );
  }

  loginToDashboard(user: string) {
    this.error = '';
    if (user && user != ' ') {
      var UID = user;
      CometChat.getLoggedinUser()
        .then(
          (user) => {
            if (!user) {
              this.inProgress = false;
              CometChatUIKit.login({ uid: UID }).then(
                (user) => {
                  console.log('Login Successful:', { user });
                  // this.router.navigate(['/home']);
                },
                (error) => {
                  this.error = error.message;
                }
              );
            } else {
              this.inProgress = false;
              // this.router.navigate(['/home']);
            }
          },
          (error) => {
            this.inProgress = false;
            this.error = error.message;
          }
        )
        .catch((error: CometChat.CometChatException) => {
          this.inProgress = false;
          console.log(error);
        });
    }
  }
}
