import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthGuard } from './guards/auth-guard';
import { LoggedInAuthGuard } from './guards/loggedin-guard';

import { AdminModule } from './admin/admin.module';
import { AuthService } from './services/auth.service';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { FeedModule } from './feed/feed.module';
import { IsAdminGuard } from './guards/is-admin-guard';
import { ChatModule } from './chat/chat.module';
import { SearchbarComponent } from './common/searchbar/searchbar.component';
import { MatBadgeModule } from '@angular/material/badge';
import { SupportModule } from './support/support.module';
import {
  CometChatConversations,
  CometChatConversationsWithMessages,
  CometChatDetails,
  CometChatGroups,
  CometChatGroupsWithMessages,
  CometChatIncomingCall,
  CometChatMessageComposer,
  CometChatMessageHeader,
  CometChatMessageList,
  CometChatMessages,
  CometChatUsers,
  CometChatUsersWithMessages,
} from '@cometchat/chat-uikit-angular';

// import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SearchbarComponent,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,

    CometChatConversationsWithMessages,
    CometChatMessages,
    CometChatIncomingCall,

    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatBadgeModule,
    FlexLayoutModule,
    AdminModule,
    FeedModule,
    ChatModule,
    SubscriptionsModule,
    SupportModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    AuthGuard,
    LoggedInAuthGuard,
    AuthService,
    CookieService,
    IsAdminGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
