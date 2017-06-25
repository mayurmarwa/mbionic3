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
import { NavController, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';
import { EnquirySentPage } from '../enquiry-sent/enquiry-sent';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
/*
  Generated class for the SendEnquiry page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SendEnquiryPage = (function () {
    function SendEnquiryPage(navCtrl, navParams, formBuilder, af, alertCtrl, loadingCtrl, authService, storage, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.af = af;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.authService = authService;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        this.currentuser = firebase.auth().currentUser;
        // storage.ready().then(() => {
        //  storage.get('currentuser').then((val) => {
        //this.currentuser = JSON.parse(val);
        this.product = navParams.get("product");
        this.sellerID = this.product.uid;
        //console.log(this.currentuser);
        //this.currentuser = firebase.auth().currentUser;
        this.userEnquiries = af.database.list('/users/' + this.currentuser.uid + '/enquiries');
        this.sellerEnquiries = af.database.list('/users/' + this.sellerID + '/enquiries');
        if (this.product.mrate) {
            this.productmrate = this.product.mrate;
        }
        else {
            this.productmrate = null;
        }
        if (this.product.krate) {
            this.productkrate = this.product.krate;
        }
        else {
            this.productkrate = null;
        }
        this.productunit = "Kg";
        this.authService.getFullProfile(this.sellerID).first()
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
        this.authService.getFullProfile(this.currentuser.uid).first()
            .subscribe(function (user) {
            //loading.dismiss();
            // this.user.displayName = user.displayName;
            //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
            //this.user.photoURL = user.photoURL || this.user.photoURL;
            _this.user = user;
            //console.log(this.user);
        }, function (error) {
            //loading.dismiss();
            console.log('Error: ' + JSON.stringify(error));
        });
        //})
        //  .catch((err) =>
        //    console.log(err));
        //}).catch((err) =>
        //  console.log(err));
        this.enquiryForm = formBuilder.group({
            rate: ['', Validators.required],
            quantity: ['', Validators.required],
            unit: ['', Validators.required],
            payment: ['', Validators.required],
            details: ['',]
        });
    }
    SendEnquiryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SendEnquiryPage');
        //console.log(this.seller);
        //console.log(this.productID);
    };
    SendEnquiryPage.prototype.showConfirm = function (enquiryForm) {
        var _this = this;
        if (!enquiryForm.valid) {
            var alert_1 = this.alertCtrl.create({
                title: 'Invalid Entries!',
                subTitle: 'Please fill all required entries',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            var confirm_1 = this.alertCtrl.create({
                title: 'Submit Enquiry?',
                message: 'Do you want to send this enquiry to the seller?',
                buttons: [
                    {
                        text: 'No',
                    },
                    {
                        text: 'Agree',
                        handler: function () {
                            _this.submitEnquiry();
                        }
                    }
                ]
            });
            confirm_1.present();
        }
    };
    SendEnquiryPage.prototype.submitEnquiry = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Sending Enquiry, Please Wait...'
        });
        this.loading.present().then(function () {
            _this.userEnquiries.push(_this.enquiryForm.value).then(function (data) {
                //console.log(this.enquiryForm.value);
                _this.af.database.object('users/' + _this.currentuser.uid + '/enquiries/' + data.key).update({
                    type: 'sent',
                    otheruser: _this.sellerID,
                    otheruserName: _this.seller.name,
                    otheruserNo: _this.seller.mobile,
                    product: _this.product,
                    productName: _this.product.name,
                    productUnit: _this.productunit,
                    productMrate: _this.productmrate,
                    productKrate: _this.productkrate,
                    timestamp: firebase.database['ServerValue']['TIMESTAMP']
                    //detials: this.productForm.value.name,
                }).then(function (info) {
                    //console.log("successsent");
                    //this.navCtrl.pop();
                    //this.navCtrl.pop();
                }).catch(function (info) {
                    //console.log("successsent");
                    //this.navCtrl.pop();
                    //this.navCtrl.pop();
                });
                _this.af.database.object('users/' + _this.sellerID + '/enquiries/' + data.key).update({
                    type: 'received',
                    otheruser: _this.currentuser.uid,
                    otheruserName: _this.user.name,
                    otheruserNo: _this.user.mobile,
                    product: _this.product,
                    productName: _this.product.name,
                    productUnit: _this.productunit,
                    productMrate: _this.productmrate,
                    productKrate: _this.productkrate,
                    rate: _this.enquiryForm.value.rate,
                    quantity: _this.enquiryForm.value.quantity,
                    unit: _this.enquiryForm.value.unit,
                    payment: _this.enquiryForm.value.payment,
                    details: _this.enquiryForm.value.details,
                    timestamp: firebase.database['ServerValue']['TIMESTAMP']
                    //detials: this.productForm.value.name,
                }).then(function (info) {
                    //console.log("successrcv");
                    //this.navCtrl.pop();
                    //this.navCtrl.pop();
                    _this.loading.dismiss().then(function () {
                        _this.navCtrl.push(EnquirySentPage, { enquiryID: data.key, sellerID: _this.sellerID, uid: _this.currentuser.uid })
                            .then(function () {
                            var index = _this.viewCtrl.index;
                            _this.navCtrl.remove(index);
                            _this.navCtrl.remove(index - 1);
                        });
                    });
                }).catch(function (info) {
                    //console.log("successsent");
                    //this.navCtrl.pop();
                    //this.navCtrl.pop();
                });
            }).catch(function (info) {
                //console.log("successsent");
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
    __metadata("design:paramtypes", [NavController, NavParams, FormBuilder, AngularFire, AlertController, LoadingController, AuthService, Storage, ViewController])
], SendEnquiryPage);
export { SendEnquiryPage };
//# sourceMappingURL=send-enquiry.js.map