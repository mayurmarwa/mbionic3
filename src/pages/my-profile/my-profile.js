var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
/*
  Generated class for the MyProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MyProfilePage = (function () {
    function MyProfilePage(navCtrl, navParams, authService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.userID = navParams.get("userID");
        this.authService.getFullProfile(this.userID)
            .subscribe(function (user) {
            //loading.dismiss();
            // this.user.displayName = user.displayName;
            //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
            //this.user.photoURL = user.photoURL || this.user.photoURL;
            _this.userProfile = user;
            console.log(_this.userProfile);
        }, function (error) {
            //loading.dismiss();
            console.log('Error: ' + JSON.stringify(error));
        });
    }
    MyProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyProfilePage');
    };
    return MyProfilePage;
}());
MyProfilePage = __decorate([
    Component({
        selector: 'page-my-profile',
        templateUrl: 'my-profile.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AuthService])
], MyProfilePage);
export { MyProfilePage };
//# sourceMappingURL=my-profile.js.map