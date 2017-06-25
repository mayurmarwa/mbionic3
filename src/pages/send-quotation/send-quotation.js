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
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../providers/auth.service';
import firebase from 'firebase';
/*
  Generated class for the SendQuotation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SendQuotationPage = (function () {
    function SendQuotationPage(navCtrl, navParams, formBuilder, af, authService, alertCtrl, loadingCtrl, storage, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.af = af;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.currentuser = firebase.auth().currentUser;
        //storage.ready().then(() => {
        //  storage.get('currentuser').then((val) => {
        //this.currentuser = JSON.parse(val);
        this.requirement = navParams.get("requirement");
        this.postuserID = this.requirement.uid;
        this.userEnquiries = af.database.list('/users/' + this.currentuser.uid + '/enquiries');
        this.postuserEnquiries = af.database.list('/users/' + this.postuserID + '/enquiries');
        this.authService.getFullProfile(this.postuserID).first()
            .subscribe(function (user) {
            //loading.dismiss();
            // this.user.displayName = user.displayName;
            //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
            //this.user.photoURL = user.photoURL || this.user.photoURL;
            _this.poster = user;
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
        //});
        //});
        this.quoteForm = formBuilder.group({
            price: ['', Validators.required],
            delivery: ['', Validators.required],
            payment: ['', Validators.required],
            details: ['',]
        });
    }
    SendQuotationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SendQuotationPage');
    };
    SendQuotationPage.prototype.showConfirm = function (quoteForm) {
        var _this = this;
        if (!quoteForm.valid) {
            var alert_1 = this.alertCtrl.create({
                title: 'Invalid Entries!',
                subTitle: 'Please fill all required entries',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            var confirm_1 = this.alertCtrl.create({
                title: 'Submit Quote?',
                message: 'Do you want to send this quote to the buyer?',
                buttons: [
                    {
                        text: 'No',
                    },
                    {
                        text: 'Agree',
                        handler: function () {
                            _this.submitQuote();
                        }
                    }
                ]
            });
            confirm_1.present();
        }
    };
    SendQuotationPage.prototype.submitQuote = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Sending Quote...'
        });
        this.loading.present().then(function () {
            _this.userEnquiries.push(_this.quoteForm.value).then(function (data) {
                //console.log(this.enquiryForm.value);
                _this.af.database.object('users/' + _this.currentuser.uid + '/enquiries/' + data.key).update({
                    type: 'sent',
                    otheruser: _this.postuserID,
                    otheruserName: _this.poster.name,
                    otheruserNo: _this.poster.mobile,
                    requirement: _this.requirement,
                    quote: _this.quoteForm.value,
                    timestamp: firebase.database['ServerValue']['TIMESTAMP']
                }).then(function (info) {
                    //console.log("successsent");
                    //this.navCtrl.pop();
                    //this.navCtrl.pop();
                }).catch(function (info) {
                    //console.log("successsent");
                    //this.navCtrl.pop();
                    //this.navCtrl.pop();
                });
                _this.af.database.object('users/' + _this.postuserID + '/enquiries/' + data.key).update({
                    type: 'received',
                    otheruser: _this.currentuser.uid,
                    otheruserName: _this.user.name,
                    otheruserNo: _this.user.mobile,
                    requirement: _this.requirement,
                    quote: _this.quoteForm.value,
                    timestamp: firebase.database['ServerValue']['TIMESTAMP']
                    //detials: this.productForm.value.name,
                }).then(function (info) {
                    _this.loading.dismiss().then(function () {
                        var toast = _this.toastCtrl.create({
                            message: 'Quote sent, check enquiries for details',
                            duration: 2500,
                            position: 'middle'
                        });
                        toast.present();
                        _this.navCtrl.popToRoot();
                    });
                    //this.navCtrl.pop();
                    //this.navCtrl.pop();
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
    return SendQuotationPage;
}());
SendQuotationPage = __decorate([
    Component({
        selector: 'page-send-quotation',
        templateUrl: 'send-quotation.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FormBuilder, AngularFire, AuthService, AlertController, LoadingController, Storage, ToastController])
], SendQuotationPage);
export { SendQuotationPage };
//# sourceMappingURL=send-quotation.js.map