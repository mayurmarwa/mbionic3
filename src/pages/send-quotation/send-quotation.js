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
  Generated class for the SendQuotation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SendQuotationPage = (function () {
    function SendQuotationPage(navCtrl, navParams, formBuilder, af) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.af = af;
        this.requirement = navParams.get("requirement");
        this.postuserID = this.requirement.uid;
        this.currentuser = firebase.auth().currentUser;
        this.userEnquiries = af.database.list('/users/' + this.currentuser.uid + '/enquiries');
        this.postuserEnquiries = af.database.list('/users/' + this.postuserID + '/enquiries');
        this.quoteForm = formBuilder.group({
            price: ['', Validators.required],
            delivery: ['', Validators.required],
            payment: ['', Validators.required],
            details: ['', Validators.required]
        });
    }
    SendQuotationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SendQuotationPage');
    };
    SendQuotationPage.prototype.submitQuote = function () {
        var _this = this;
        this.userEnquiries.push(this.quoteForm.value).then(function (data) {
            //console.log(this.enquiryForm.value);
            _this.af.database.object('users/' + _this.currentuser.uid + '/enquiries/' + data.key).update({
                type: 'sent',
                otheruser: _this.postuserID,
                requirement: _this.requirement,
                quote: _this.quoteForm.value
            }).then(function (info) {
                console.log("successsent");
                //this.navCtrl.pop();
                //this.navCtrl.pop();
            });
            _this.af.database.object('users/' + _this.postuserID + '/enquiries/' + data.key).update({
                type: 'received',
                otheruser: _this.currentuser.uid,
                requirement: _this.requirement,
                quote: _this.quoteForm.value
                //detials: this.productForm.value.name,
            }).then(function (info) {
                console.log("successrcv");
                //this.navCtrl.pop();
                //this.navCtrl.pop();
            });
        });
    };
    return SendQuotationPage;
}());
SendQuotationPage = __decorate([
    Component({
        selector: 'page-send-quotation',
        templateUrl: 'send-quotation.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FormBuilder, AngularFire])
], SendQuotationPage);
export { SendQuotationPage };
//# sourceMappingURL=send-quotation.js.map