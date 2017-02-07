import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { TabContactsPage } from '../pages/tab-contacts/tab-contacts';
import { TabProfilePage } from '../pages/tab-profile/tab-profile';
import { TabChatsPage } from '../pages/tab-chats/tab-chats';
import { ChatChannelPage } from '../pages/chat-channel/chat-channel';
import { ChatMessagePage } from '../pages/chat-message/chat-message';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { SignupPage } from '../pages/signup/signup';

import { AuthService } from '../providers/auth.service';
import { ChatsService } from '../providers/chats.service';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
    apiKey: "AIzaSyBQHf2p8RLOuw7i_DHdsfc8HHCFfwcIPEQ",
    authDomain: "metbazaardev.firebaseapp.com",
    databaseURL: "https://metbazaardev.firebaseio.com",
    storageBucket: "metbazaardev.appspot.com",
    messagingSenderId: "79899062384"
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    TabContactsPage,
    TabProfilePage,
    TabChatsPage,
    ChatChannelPage,
    ChatMessagePage,
    LoginPage,
    AboutPage,
    ResetpasswordPage,
    SignupPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    TabContactsPage,
    TabProfilePage,
    TabChatsPage,
    ChatChannelPage,
    ChatMessagePage,
    LoginPage,
    AboutPage,
    ResetpasswordPage,
    SignupPage
  ],
  providers: [AuthService, ChatsService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
