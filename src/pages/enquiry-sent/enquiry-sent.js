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
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { EnquiriesPage } from '../enquiries/enquiries';
import { AuthService } from '../../providers/auth.service';
import { EnquiryDetailsPage } from '../enquiry-details/enquiry-details';
import { MyProfilePage } from '../my-profile/my-profile';
/*
  Generated class for the EnquirySent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var EnquirySentPage = (function () {
    function EnquirySentPage(navCtrl, navParams, loadingCtrl, authService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.authService = authService;
        this.sellerID = navParams.get("sellerID");
        this.enquiryID = navParams.get("enquiryID");
        this.uid = navParams.get("uid");
        this.authService.getFullProfile(this.sellerID)
            .subscribe(function (user) {
            //loading.dismiss();
            // this.user.displayName = user.displayName;
            //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
            //this.user.photoURL = user.photoURL || this.user.photoURL;
            _this.seller = user;
            //console.log(this.seller);
        }, function (error) {
            //loading.dismiss();
            console.log('Error: ' + JSON.stringify(error));
        });
        this.authService.getEnquiry(this.uid, this.enquiryID)
            .subscribe(function (enquiry) {
            //loading.dismiss();
            // this.user.displayName = user.displayName;
            //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
            //this.user.photoURL = user.photoURL || this.user.photoURL;
            _this.enquiry = enquiry;
            //console.log(this.enquiry);
        }, function (error) {
            //loading.dismiss();
            console.log('Error: ' + JSON.stringify(error));
        });
    }
    EnquirySentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EnquirySentPage');
    };
    EnquirySentPage.prototype.sendMessage = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({});
        this.loading.present();
        setTimeout(function () {
            _this.navCtrl.popToRoot({ animate: false });
            _this.navCtrl.setRoot(EnquiriesPage, { animate: false });
            _this.navCtrl.push(EnquiryDetailsPage, { enquiry: _this.enquiry }, { animate: false });
            //this.navCtrl.pop({ animate: false });
        }, 1000);
        setTimeout(function () {
            _this.loading.dismiss();
        }, 2000);
    };
    EnquirySentPage.prototype.viewProfile = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({});
        this.loading.present();
        setTimeout(function () {
            //this.navCtrl.pop({ animate: false });          
            _this.navCtrl.push(MyProfilePage, { userID: _this.sellerID }, { animate: false });
            //this.navCtrl.pop({ animate: false });
        }, 1000);
        setTimeout(function () {
            _this.loading.dismiss();
        }, 2000);
    };
    return EnquirySentPage;
}());
EnquirySentPage = __decorate([
    Component({
        selector: 'page-enquiry-sent',
        templateUrl: 'enquiry-sent.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, LoadingController, AuthService])
], EnquirySentPage);
export { EnquirySentPage };
//# sourceMappingURL=enquiry-sent.js.map