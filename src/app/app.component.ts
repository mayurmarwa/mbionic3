import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
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
    public storage: Storage
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
        { title: 'Share App', component: TabProfilePage, icon: 'share' },
        { title: 'About', component: AboutPage, icon: 'about' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
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
    this.nav.setRoot(LoginPage);
  }
}
