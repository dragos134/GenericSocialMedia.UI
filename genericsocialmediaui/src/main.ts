import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import {
  CometChatUIKit,
  UIKitSettingsBuilder,
} from '@cometchat/chat-uikit-angular';

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));

const COMETCHAT_CONSTANTS = {
  APP_ID: '24865315e6e1e4d6', // Replace with your App ID
  REGION: 'eu', // Replace with your App Region ("eu" or "us")
  AUTH_KEY: '8a5a9499e3adff4f5313cf14d06861aa7bfff1af', // Replace with your Auth Key
};

// //create the builder
const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForFriends()
  .build();

// //Initialize CometChat
CometChatUIKit.init(uiKitSettings)?.then(() => {
  //load your root module
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});
