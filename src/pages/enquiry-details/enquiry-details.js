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
import { AngularFire } from 'angularfire2';
import { Storage } from '@ionic/storage';
import { MyProfilePage } from '../my-profile/my-profile';
import { ProductPagePage } from '../product-page/product-page';
/*
  Generated class for the EnquiryDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var EnquiryDetailsPage = (function () {
    function EnquiryDetailsPage(navCtrl, navParams, af, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.storage = storage;
        storage.ready().then(function () {
            storage.get('currentuser').then(function (val) {
                _this.currentuser = JSON.parse(val);
                _this.enquiry = navParams.get("enquiry");
                _this.messageList = af.database.list('/users/' + _this.currentuser.uid + '/enquiries/' + _this.enquiry.$key + '/messgaes/');
                _this.otherUserList = af.database.list('/users/' + _this.enquiry.otheruser + '/enquiries/' + _this.enquiry.$key + '/messgaes/');
            })
                .catch(function (err) {
                return console.log(err);
            });
        }).catch(function (err) {
            return console.log(err);
        });
        //console.log(this.enquiry);
    }
    EnquiryDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EnquiryDetailsPage');
    };
    EnquiryDetailsPage.prototype.send = function (chatBox) {
        //console.log(chatBox);
        this.messageList.push({
            text: this.chatBox,
            type: 'sent'
        });
        this.otherUserList.push({
            text: this.chatBox,
            type: 'received'
        });
        this.chatBox = '';
    };
    EnquiryDetailsPage.prototype.viewProfile = function () {
        this.navCtrl.push(MyProfilePage, { userID: this.enquiry.otheruser });
    };
    EnquiryDetailsPage.prototype.viewProduct = function () {
        this.navCtrl.push(ProductPagePage, { product: this.enquiry.product });
    };
    return EnquiryDetailsPage;
}());
EnquiryDetailsPage = __decorate([
    Component({
        selector: 'page-enquiry-details',
        templateUrl: 'enquiry-details.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire, Storage])
], EnquiryDetailsPage);
export { EnquiryDetailsPage };
//# sourceMappingURL=enquiry-details.js.map