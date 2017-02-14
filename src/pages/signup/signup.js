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
import { LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { TabsPage } from '../tabs/tabs';
import { EmailValidator } from '../../validators/email';
import { App } from 'ionic-angular';
import { NgZone } from '@angular/core';
/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var SignupPage = (function () {
    function SignupPage(nav, authService, formBuilder, loadingCtrl, alertCtrl, app, zone) {
        this.nav = nav;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.zone = zone;
        this.emailChanged = false;
        this.passwordChanged = false;
        this.submitAttempt = false;
        this.signupForm = formBuilder.group({
            name: ['', Validators.required],
            mobile: ['', Validators.compose([Validators.minLength(10), Validators.required, Validators.maxLength(10)])],
            companyname: ['', Validators.required],
            email: ['', Validators.compose([Validators.required,
                    EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6),
                    Validators.required])],
        });
    }
    /**
    * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
    */
    SignupPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    /**
    * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
    * component while the user waits.
    *
    * If the form is invalid it will just log the form value, feel free to handle that as you like.
    */
    SignupPage.prototype.signupUser = function () {
        var _this = this;
        this.submitAttempt = true;
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
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage = __decorate([
        Component({
            selector: 'page-signup',
            templateUrl: 'signup.html'
        }), 
        __metadata('design:paramtypes', [NavController, AuthService, FormBuilder, LoadingController, AlertController, App, NgZone])
    ], SignupPage);
    return SignupPage;
}());
//# sourceMappingURL=signup.js.map