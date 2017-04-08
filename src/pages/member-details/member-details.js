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
import { CallNumber } from '@ionic-native/call-number';
import { Platform } from 'ionic-angular';
/*
  Generated class for the MemberDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MemberDetailsPage = (function () {
    function MemberDetailsPage(navCtrl, navParams, platform, call) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.call = call;
        console.log(navParams.get('member'));
        this.member = navParams.get('member');
    }
    MemberDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MemberDetailsPage');
    };
    MemberDetailsPage.prototype.callNo = function (type) {
        if (type == 1) {
            this.callnumber = this.member["Mobile 1"];
        }
        else if (type == 2) {
            this.callnumber = this.member["Mobile 2"];
        }
        else if (type == 3) {
            this.callnumber = this.member["Mobile 3"];
        }
        this.callIt();
    };
    MemberDetailsPage.prototype.callLand = function (type) {
        if (this.member["std"]) {
            this.callnumber = this.member["std"].toString();
        }
        else {
            this.callnumber = "022";
        }
        if (type == 1) {
            this.callnumber = this.callnumber + this.member["Office 1"];
        }
        else if (type == 2) {
            this.callnumber = this.callnumber + this.member["Office 2"];
        }
        else if (type == 3) {
            this.callnumber = this.callnumber + this.member["Office 3"];
        }
        this.callIt();
    };
    MemberDetailsPage.prototype.callIt = function () {
        if (!this.platform.is('cordova')) {
            window.open("tel:" + this.callnumber);
            console.log(this.callnumber);
        }
        else {
            this.call.callNumber(this.callnumber, true)
                .then(function () { return console.log('Launched dialer!'); })
                .catch(function () { return console.log('Error launching dialer'); });
        }
    };
    return MemberDetailsPage;
}());
MemberDetailsPage = __decorate([
    Component({
        selector: 'page-member-details',
        templateUrl: 'member-details.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Platform, CallNumber])
], MemberDetailsPage);
export { MemberDetailsPage };
//# sourceMappingURL=member-details.js.map