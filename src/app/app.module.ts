import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CustomIconsModule } from 'ionic2-custom-icons';
import { IonicStorageModule } from '@ionic/storage';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';
import { FCM } from '@ionic-native/fcm';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { Market } from '@ionic-native/market';


import { TabsPage } from '../pages/tabs/tabs';

import { ProfileData } from '../providers/profile-data';
import { ProductData } from '../providers/product-data';
import { DirectoryProvider } from '../providers/directory-provider';
import { AuthService } from '../providers/auth.service';
import { ChatsService } from '../providers/chats.service';

import { ParallaxHeader } from '../components/parallax-header/parallax-header';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
    apiKey: "AIzaSyBLx3cXHMhd6TOWWDGZS-J1stb2w34B47A",
    authDomain: "metbazaar.firebaseapp.com",
    databaseURL: "https://metbazaar.firebaseio.com",
    projectId: "metbazaar",
    storageBucket: "metbazaar.appspot.com",
    messagingSenderId: "639273963235"
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ParallaxHeader,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    CustomIconsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [AuthService, ChatsService, ProfileData, ProductData, DirectoryProvider , StatusBar,SplashScreen, Camera,CallNumber, FCM, SocialSharing, GooglePlus, Facebook, Market, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
