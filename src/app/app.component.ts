import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, AlertController } from 'ionic-angular';
import { Push, RegistrationEventResponse, NotificationEventResponse } from '@ionic-native/push';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { TabProfilePage } from '../pages/tab-profile/tab-profile';
import { MyProductsPage } from '../pages/my-products/my-products';
import { PostBuyRequirementsPage } from '../pages/post-buy-requirements/post-buy-requirements';
import { BrowseRequirementsPage } from '../pages/browse-requirements/browse-requirements';
import { DirectoryPage } from '../pages/directory/directory';
import { SpeedDialPage } from '../pages/speed-dial/speed-dial';
import { SettingsPage } from '../pages/settings/settings';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';

import { AuthService } from '../providers/auth.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  public currentuser: any;


  openPages: Array<{title: string, component: any, icon: string}>;
  pushPages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public storage: Storage,
    public alertCtrl: AlertController,
    private socialSharing: SocialSharing,
    private pushplugin: Push,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();

    let loading = this.loadingCtrl.create();
    loading.present();
    this.authService.getAuth()
      .map(state => !!state)
      .subscribe(authenticated => {
          loading.dismiss();
          if (authenticated) {

              this.currentuser = firebase.auth().currentUser;
              this.storage.ready().then(() => {
                  // set a key/value
                  this.storage.set('currentuser', JSON.stringify(this.currentuser));
                  // Or to get a key/value pair
                  // this.storage.get('currentuser').then((val) => {
                  //     console.log('Current User', JSON.parse(val));
                  //})
                  this.initPushNotification();
              });
             // console.log(this.currentuser);
              this.rootPage = TabsPage;
          }
         // else { this.rootPage = LoginPage; }
        this.rootPage = (authenticated) ? TabsPage : LoginPage;
      }, (error) => {
        loading.dismiss();
        this.rootPage = LoginPage;
        console.log('Error: ' + JSON.stringify(error));
      });

    // used for an example of ngFor and navigation
    this.openPages = [
      { title: 'Home', component: TabsPage, icon: 'home'  }
    ];

    this.pushPages = [
        { title: 'Profile', component: TabProfilePage, icon: 'profile' },
        { title: 'Post A Requirement', component: PostBuyRequirementsPage, icon: 'post' },
        { title: 'Browse Requirements', component: BrowseRequirementsPage, icon: 'search' },
        { title: 'My Products', component: MyProductsPage, icon: 'products' },
        { title: 'Directory', component: DirectoryPage, icon: 'directory' },
        { title: 'Speed Dial', component: SpeedDialPage, icon: 'dialer' },
        { title: 'Settings', component: SettingsPage, icon: 'settings' },        
        { title: 'About', component: AboutPage, icon: 'about' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
       this.statusBar.styleDefault();
       this.splashScreen.hide();

      
    });
  }

  initPushNotification() {
      if (!this.platform.is('cordova')) {
          console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
          return;
      }
      let push = this.pushplugin.init({
          android: {
              senderID: "79899062384"
          },
          ios: {
              alert: "true",
              badge: false,
              sound: "true"
          },
          windows: {}
      });

      push.on('registration').subscribe((data: RegistrationEventResponse) => {
          console.log("device token ->", data.registrationId);
          //TODO - send device token to server
          //var newPostKey = firebase.database().ref().child('fcmtokens').push().key;
          //var postData = {
          //    fcmtoken: data.registrationId
          //};
          firebase.database().ref('/users/' + this.currentuser.uid + '/fcmtokens/').set({
              fcmtoken: data.registrationId
          });
          firebase.database().ref('/fcmtokens/' + this.currentuser.uid + '/').set({
              fcmtoken: data.registrationId
          });
          return 
      
          // Write the new post's data simultaneously in the posts list and the user's post list.
          //var updates = {};
         // updates['/fcmtokens/' + this.currentuser.uid + '/' + newPostKey] = postData;
         // updates['/users/' + this.currentuser.uid + '/fcmtokens/' + newPostKey] = postData;

          //return firebase.database().ref().update(updates);
      });
      push.on('notification').subscribe( (data: NotificationEventResponse) => {
          console.log('message', data.message);
          //let self = this;
          //if user using app and push notification comes
          if (data.additionalData.foreground) {
              // if application open, show popup
              let confirmAlert = this.alertCtrl.create({
                  title: 'New Notification',
                  message: data.message,
                  buttons: [{
                      text: 'Ignore',
                      role: 'cancel'
                  }, {
                      text: 'View',
                      handler: () => {
                          //TODO: Your logic here
                          //self.nav.push(DetailsPage, { message: data.message });
                          console.log(data.message);
                      }
                  }]
              });
              confirmAlert.present();
          } else {
              //if user NOT using app and push notification comes
              //TODO: Your logic on click of push notification directly
              //self.nav.push(DetailsPage, { message: data.message });
              console.log("Push notification clicked");
              console.log(data.message);

          }
      });
      push.on('error').subscribe( (e: Error) => {
          console.log(e.message);
      });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  pushPage(page) {
    this.nav.push(page.component);
  }

  logout() {
    this.authService.logout();
    //this.nav.setRoot(LoginPage);
  }

  shareApp() {
      this.socialSharing.share("Testing, sharing this from inside an app I'm building right now", null, null, "https://ionicframework.com/docs/v2/native/social-sharing/");
  }

}
