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
import firebase from 'firebase';
/*
  Generated class for the EnquiryDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var EnquiryDetailsPage = (function () {
    function EnquiryDetailsPage(navCtrl, navParams, af) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.enquiry = navParams.get("enquiry");
        this.currentuser = firebase.auth().currentUser;
        this.messageList = af.database.list('/users/' + this.currentuser.uid + '/enquiries/' + this.enquiry.$key + '/messgaes/');
        this.otherUserList = af.database.list('/users/' + this.enquiry.otheruser + '/enquiries/' + this.enquiry.$key + '/messgaes/');
    }
    EnquiryDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EnquiryDetailsPage');
    };
    EnquiryDetailsPage.prototype.send = function (chatBox) {
        console.log(chatBox);
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
    return EnquiryDetailsPage;
}());
EnquiryDetailsPage = __decorate([
    Component({
        selector: 'page-enquiry-details',
        templateUrl: 'enquiry-details.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire])
], EnquiryDetailsPage);
export { EnquiryDetailsPage };
//# sourceMappingURL=enquiry-details.js.map