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
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { Storage } from '@ionic/storage';
import { MyProfilePage } from '../my-profile/my-profile';
import { ProductPagePage } from '../product-page/product-page';
import { RequirementDetailsPage } from '../requirement-details/requirement-details';
import firebase from 'firebase';
/*
  Generated class for the EnquiryDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var EnquiryDetailsPage = (function () {
    function EnquiryDetailsPage(navCtrl, navParams, af, storage, alertCtrl, toastCtrl) {
        //storage.ready().then(() => {
        //storage.get('currentuser').then((val) => {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.currentuser = firebase.auth().currentUser;
        // this.currentuser = JSON.parse(val);
        this.enquiry = navParams.get("enquiry");
        this.messageList = af.database.list('/users/' + this.currentuser.uid + '/enquiries/' + this.enquiry.key + '/messgaes/');
        this.otherUserList = af.database.list('/users/' + this.enquiry.otheruser + '/enquiries/' + this.enquiry.key + '/messgaes/');
        this.myenquiries = af.database.list('/users/' + this.currentuser.uid + '/enquiries');
        this.otherenquiries = af.database.list('/users/' + this.enquiry.otheruser + '/enquiries');
        //})
        //.catch((err) =>
        //      console.log(err));
        //}).catch((err) =>
        //  console.log(err)); 
        //console.log(this.enquiry);
    }
    EnquiryDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EnquiryDetailsPage');
    };
    EnquiryDetailsPage.prototype.send = function (chatBox) {
        console.log(this.enquiry.key);
        console.log(this.enquiry);
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
    EnquiryDetailsPage.prototype.confirmDelete = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Delete Enquiry?',
            message: 'Do you want to delete this enquiry?',
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Confirm',
                    handler: function (data) {
                        _this.myenquiries.remove(_this.enquiry.key);
                        _this.otherenquiries.remove(_this.enquiry.key);
                        var toast = _this.toastCtrl.create({
                            message: 'Enquiry will be deleted',
                            duration: 2000,
                            position: 'middle'
                        });
                        toast.present().then(function () {
                            _this.navCtrl.pop();
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    EnquiryDetailsPage.prototype.viewProfile = function () {
        this.navCtrl.push(MyProfilePage, { userID: this.enquiry.otheruser });
    };
    EnquiryDetailsPage.prototype.viewProduct = function () {
        this.navCtrl.push(ProductPagePage, { product: this.enquiry.product });
    };
    EnquiryDetailsPage.prototype.viewRequirement = function () {
        this.navCtrl.push(RequirementDetailsPage, { requirement: this.enquiry.requirement });
    };
    return EnquiryDetailsPage;
}());
EnquiryDetailsPage = __decorate([
    Component({
        selector: 'page-enquiry-details',
        templateUrl: 'enquiry-details.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire, Storage, AlertController, ToastController])
], EnquiryDetailsPage);
export { EnquiryDetailsPage };
//# sourceMappingURL=enquiry-details.js.map