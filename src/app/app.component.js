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
var MyApp = (function () {
    function MyApp(platform, loadingCtrl, authService, storage) {
        var _this = this;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.authService = authService;
        this.storage = storage;
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
                    _this.storage.set('currentuser', JSON.stringify(_this.currentuser));
                    // Or to get a key/value pair
                    // this.storage.get('currentuser').then((val) => {
                    //     console.log('Current User', JSON.parse(val));
                    //})
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
            { title: 'Share App', component: TabProfilePage, icon: 'share' },
            { title: 'About', component: AboutPage, icon: 'about' },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
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
        this.nav.setRoot(LoginPage);
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
        Storage])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map