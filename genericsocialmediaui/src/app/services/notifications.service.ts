import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  public notificationConnection: HubConnection = {} as HubConnection;
  test: string = '';
  private noOfMessages = 0;
  constructor(private _cookieService: CookieService) {
    const token = this._cookieService.get('user_token');
    this.notificationConnection = new HubConnectionBuilder()
      .withUrl(`${environment.backendUrl}/chatHub`)
      .build();

    this.tryConnect();
  }

  tryConnect(): void {
    const token = this._cookieService.get('user_token');
    if (token == '') return;
    const decodedToken: any = jwtDecode(token);
    const chatSecret = decodedToken.chat_secret as string;
    if (chatSecret == null) return;
    this.notificationConnection.on(
      `${chatSecret}-notification`,
      (username: string) => {
        console.log(username);
        this.noOfMessages++;
      }
    );
    try {
      this.notificationConnection.start().then(() => {
        const userId = decodedToken.userId as string;
        console.log(userId);
        this.notificationConnection.send('GoOnline', userId);
      });
      console.log('Connected to signalr hub');
    } catch (error) {
      console.error('Failed to connect');
    }
  }

  disconnect() {
    this.notificationConnection.stop().then((res) => {
      console.log(res);
      console.log('disconnected successfully');
    });
  }

  setNoOfMessages(noOfMessaegs: number): void {
    this.noOfMessages = noOfMessaegs;
  }

  getNoOfMessages(): number {
    return this.noOfMessages;
  }
}
