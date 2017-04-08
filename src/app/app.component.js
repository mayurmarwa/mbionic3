var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, AlertController } from 'ionic-angular';
import { Push } from '@ionic-native/push';
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
var MyApp = (function () {
    function MyApp(platform, loadingCtrl, authService, storage, alertCtrl, socialSharing, pushplugin, splashScreen, statusBar) {
        var _this = this;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.authService = authService;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.socialSharing = socialSharing;
        this.pushplugin = pushplugin;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.initializeApp();
        var loading = this.loadingCtrl.create();
        loading.present();
        this.authService.getAuth()
            .map(function (state) { return !!state; })
            .subscribe(function (authenticated) {
            loading.dismiss();
            if (authenticated) {
                _this.currentuser = firebase.auth().currentUser;
                _this.storage.ready().then(function () {
                    // set a key/value
                    _this.storage.set('currentuser', JSON.stringify(_this.currentuser)).catch(function (err) {
                        return console.log(err);
                    });
                    // Or to get a key/value pair
                    // this.storage.get('currentuser').then((val) => {
                    //     console.log('Current User', JSON.parse(val));
                    //})
                    _this.initPushNotification();
                }).catch(function (err) {
                    return console.log(err);
                });
                // console.log(this.currentuser);
                _this.rootPage = TabsPage;
            }
            // else { this.rootPage = LoginPage; }
            _this.rootPage = (authenticated) ? TabsPage : LoginPage;
        }, function (error) {
            loading.dismiss();
            _this.rootPage = LoginPage;
            console.log('Error: ' + JSON.stringify(error));
        });
        // used for an example of ngFor and navigation
        this.openPages = [
            { title: 'Home', component: TabsPage, icon: 'home' }
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
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.initPushNotification = function () {
        var _this = this;
        if (!this.platform.is('cordova')) {
            console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
            return;
        }
        var push = this.pushplugin.init({
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
        push.on('registration').subscribe(function (data) {
            console.log("device token ->", data.registrationId);
            //TODO - send device token to server
            //var newPostKey = firebase.database().ref().child('fcmtokens').push().key;
            //var postData = {
            //    fcmtoken: data.registrationId
            //};
            firebase.database().ref('/users/' + _this.currentuser.uid + '/fcmtokens/').set({
                fcmtoken: data.registrationId
            });
            return firebase.database().ref('/fcmtokens/' + _this.currentuser.uid + '/').set({
                fcmtoken: data.registrationId
            });
            // Write the new post's data simultaneously in the posts list and the user's post list.
            //var updates = {};
            // updates['/fcmtokens/' + this.currentuser.uid + '/' + newPostKey] = postData;
            // updates['/users/' + this.currentuser.uid + '/fcmtokens/' + newPostKey] = postData;
            //return firebase.database().ref().update(updates);
        });
        push.on('notification').subscribe(function (data) {
            console.log('message', data.message);
            //let self = this;
            //if user using app and push notification comes
            if (data.additionalData.foreground) {
                // if application open, show popup
                var confirmAlert = _this.alertCtrl.create({
                    title: 'New Notification',
                    message: data.message,
                    buttons: [{
                            text: 'Ignore',
                            role: 'cancel'
                        }, {
                            text: 'View',
                            handler: function () {
                                //TODO: Your logic here
                                //self.nav.push(DetailsPage, { message: data.message });
                                console.log(data.message);
                            }
                        }]
                });
                confirmAlert.present();
            }
            else {
                //if user NOT using app and push notification comes
                //TODO: Your logic on click of push notification directly
                //self.nav.push(DetailsPage, { message: data.message });
                console.log("Push notification clicked");
                console.log(data.message);
            }
        });
        push.on('error').subscribe(function (e) {
            console.log(e.message);
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.pushPage = function (page) {
        this.nav.push(page.component);
    };
    MyApp.prototype.logout = function () {
        this.authService.logout();
        //this.nav.setRoot(LoginPage);
    };
    MyApp.prototype.shareApp = function () {
        this.socialSharing.share("Testing, sharing this from inside an app I'm building right now", null, null, "https://ionicframework.com/docs/v2/native/social-sharing/");
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform,
        LoadingController,
        AuthService,
        Storage,
        AlertController,
        SocialSharing,
        Push,
        SplashScreen,
        StatusBar])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map