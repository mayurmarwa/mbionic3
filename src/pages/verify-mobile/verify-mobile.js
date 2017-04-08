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
import { NavController } from 'ionic-angular';
import { LoadingController, AlertController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { TabsPage } from '../tabs/tabs';
import { App } from 'ionic-angular';
import { NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the VerifyMobile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var VerifyMobilePage = (function () {
    function VerifyMobilePage(nav, authService, formBuilder, loadingCtrl, http, alertCtrl, app, zone, navParams) {
        var _this = this;
        this.nav = nav;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.zone = zone;
        this.navParams = navParams;
        this.signupForm = navParams.get("form");
        this.otpValid = false;
        //this.http.get('http://2factor.in/API/V1/068c2321-12f2-11e7-9462-00163ef91450/BAL/SMS').map(res => res.json()).subscribe(data => {
        //    console.log(data);
        //});
        //this.http.get('/API/V1/068c2321-12f2-11e7-9462-00163ef91450/BAL/SMS').map(res => res.json()).subscribe(data => {
        //    console.log(data);
        //});
        //this.http.get('http://2factor.in/API/V1/068c2321-12f2-11e7-9462-00163ef91450/SMS/' + this.signupForm.value.mobile + '/AUTOGEN/Registration').map(res => res.json()).subscribe(data => {
        //    console.log(data);
        //});
        this.http.get('/API/V1/068c2321-12f2-11e7-9462-00163ef91450/SMS/' + this.signupForm.value.mobile + '/AUTOGEN/Registration').map(function (res) { return res.json(); }).subscribe(function (data) {
            //console.log(data);
            _this.sessionid = data.Details;
            if (SMS) {
                SMS.startWatch(function () {
                    //update('watching', 'watching started');
                }, function () {
                    //updateStatus('failed to start watching');
                });
            }
        });
        document.addEventListener('onSMSArrive', function (e) {
            var sms = e.data;
            this.otpinput = sms.substring(0, 5);
            //smsList.push(sms); // optional, if you want to push that arrived SMS to a list
            //updateStatus('SMS arrived, count: ' + smsList.length);
            // sms.address
            // sms.body
            //var divdata = $('div#data');
            //divdata.html(divdata.html() + JSON.stringify(sms));
        });
        //this.verifyotp();
    }
    VerifyMobilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VerifyMobilePage');
    };
    VerifyMobilePage.prototype.verifyotp = function () {
        var _this = this;
        if (this.otpinput == '' || this.otpinput == null) {
            var alert_1 = this.alertCtrl.create({
                message: "Invalid OTP, please try again.",
                buttons: [{ text: "Ok", role: 'cancel' }]
            });
            alert_1.present();
        }
        else {
            // this.http.get('http://2factor.in/API/V1/068c2321-12f2-11e7-9462-00163ef91450/SMS/VERIFY/{session_id}/{otp_input}' + this.signupForm.value.mobile + '/AUTOGEN/Registration').map(res => res.json()).subscribe(data => {
            //     console.log(data);
            //   }); 
            //this.http.get('http://2factor.in/API/V1/068c2321-12f2-11e7-9462-00163ef91450/SMS/VERIFY/' + this.sessionid + '/' + this.otpinput).map(res => res.json()).subscribe(data => {
            this.http.get('/API/V1/068c2321-12f2-11e7-9462-00163ef91450/SMS/VERIFY/' + this.sessionid + '/' + this.otpinput).map(function (res) { return res.json(); }).subscribe(function (data) {
                //console.log(data);
                if (data.Status == "Success") {
                    _this.signupUser();
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        message: "Invalid OTP, please try again.",
                        buttons: [{ text: "Ok", role: 'cancel' }]
                    });
                    alert_2.present();
                }
            });
        }
    };
    VerifyMobilePage.prototype.signupUser = function () {
        var _this = this;
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        }
        else {
            this.authService.signupUser(this.signupForm.value.email, this.signupForm.value.password).then(function (authData) {
                console.log(authData);
                console.log(_this.signupForm.value);
                _this.authService.createAccount2(authData, _this.signupForm);
                _this.zone.run(function () {
                    _this.app.getRootNav().setRoot(TabsPage);
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    console.log(error);
                    var errorMessage = error.message;
                    var alert = _this.alertCtrl.create({
                        message: errorMessage,
                        buttons: [{ text: "Ok", role: 'cancel' }]
                    });
                    alert.present();
                });
            });
            this.loading = this.loadingCtrl.create({
                //dismissOnPageChange: true,
                duration: 3000
            });
            this.loading.present();
        }
    };
    return VerifyMobilePage;
}());
VerifyMobilePage = __decorate([
    Component({
        selector: 'page-verify-mobile',
        templateUrl: 'verify-mobile.html'
    }),
    __metadata("design:paramtypes", [NavController, AuthService,
        FormBuilder, LoadingController,
        Http,
        AlertController, App, NgZone, NavParams])
], VerifyMobilePage);
export { VerifyMobilePage };
//# sourceMappingURL=verify-mobile.js.map