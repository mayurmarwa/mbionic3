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
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import firebase from 'firebase';
/*
  Generated class for the SendEnquiry page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SendEnquiryPage = (function () {
    function SendEnquiryPage(navCtrl, navParams, formBuilder, af) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.af = af;
        this.sellerID = navParams.get("seller");
        this.productName = navParams.get("productName");
        this.currentuser = firebase.auth().currentUser;
        this.userEnquiries = af.database.list('/users/' + this.currentuser.uid + '/enquiries');
        this.sellerEnquiries = af.database.list('/users/' + this.sellerID + '/enquiries');
        this.enquiryForm = formBuilder.group({
            details: ['', Validators.required]
        });
    }
    SendEnquiryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SendEnquiryPage');
        //console.log(this.seller);
        //console.log(this.productID);
    };
    SendEnquiryPage.prototype.submitEnquiry = function () {
        var _this = this;
        this.userEnquiries.push(this.enquiryForm.value).then(function (data) {
            //console.log(this.enquiryForm.value);
            _this.af.database.object('users/' + _this.currentuser.uid + '/enquiries/' + data.key).update({
                type: 'sent',
                otheruser: _this.sellerID,
                productName: _this.productName
                //detials: this.productForm.value.name,
            }).then(function (info) {
                console.log("successsent");
                //this.navCtrl.pop();
                //this.navCtrl.pop();
            });
            _this.af.database.object('users/' + _this.sellerID + '/enquiries/' + data.key).update({
                type: 'received',
                otheruser: _this.currentuser.uid,
                productName: _this.productName,
                details: _this.enquiryForm.value.details
                //detials: this.productForm.value.name,
            }).then(function (info) {
                console.log("successrcv");
                //this.navCtrl.pop();
                //this.navCtrl.pop();
            });
        });
    };
    return SendEnquiryPage;
}());
SendEnquiryPage = __decorate([
    Component({
        selector: 'page-send-enquiry',
        templateUrl: 'send-enquiry.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FormBuilder, AngularFire])
], SendEnquiryPage);
export { SendEnquiryPage };
//# sourceMappingURL=send-enquiry.js.map