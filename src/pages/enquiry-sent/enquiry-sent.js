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
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { MyProfilePage } from '../my-profile/my-profile';
/*
  Generated class for the EnquirySent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var EnquirySentPage = (function () {
    function EnquirySentPage(navCtrl, navParams, loadingCtrl, authService, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.authService = authService;
        this.viewCtrl = viewCtrl;
        this.tab = this.navCtrl.parent;
        this.sellerID = navParams.get("sellerID");
        this.enquiryID = navParams.get("enquiryID");
        this.uid = navParams.get("uid");
        console.log(this.enquiryID);
        this.subscription = this.authService.getFullProfile(this.sellerID)
            .first().subscribe(function (user) {
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
        this.subscription2 = this.authService.getEnquiry(this.uid, this.enquiryID)
            .first().subscribe(function (enquiry) {
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
        this.navCtrl.popToRoot({ animate: false }).then(function () {
            _this.tab.select(3);
        });
        //this.tab.select(3);
        //this.navCtrl.setRoot(EnquiriesPage,{ animate: false });
        //this.navCtrl.push(EnquiryDetailsPage, {enquiry: this.enquiry}, { animate: false });
        //this.navCtrl.pop({ animate: false });
    };
    EnquirySentPage.prototype.viewProfile = function () {
        var _this = this;
        //this.navCtrl.pop({ animate: false });          
        this.navCtrl.push(MyProfilePage, { userID: this.sellerID })
            .then(function () {
            var index = _this.viewCtrl.index;
            _this.navCtrl.remove(index);
            //this.navCtrl.remove(index - 1);
        });
        //this.navCtrl.pop({ animate: false });
    };
    return EnquirySentPage;
}());
EnquirySentPage = __decorate([
    Component({
        selector: 'page-enquiry-sent',
        templateUrl: 'enquiry-sent.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, LoadingController, AuthService, ViewController])
], EnquirySentPage);
export { EnquirySentPage };
//# sourceMappingURL=enquiry-sent.js.map