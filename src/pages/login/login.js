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
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { SignupPage } from '../signup/signup';
import { CreateProfilePage } from '../create-profile/create-profile';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService, AuthMode } from '../../providers/auth.service';
import { EmailValidator } from '../../validators/email';
import { App } from 'ionic-angular';
import { NgZone } from '@angular/core';
export var LoginPage = (function () {
    function LoginPage(navCtrl, loadingCtrl, toastCtrl, authService, formBuilder, alertCtrl, app, zone) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.zone = zone;
        this.homePage = TabsPage;
        this.submitAttempt = false;
        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required,
                    EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6),
                    Validators.required])]
        });
    }
    /**
     * login with facebook
     */
    LoginPage.prototype.loginWithFacebook = function () {
        this.login(AuthMode.Facebook);
    };
    /**
     * login with google
     */
    LoginPage.prototype.loginWithGoogle = function () {
        this.login(AuthMode.GooglePlus);
    };
    /**
     * login with Github
     */
    LoginPage.prototype.loginWithGithub = function () {
        this.login(AuthMode.Github);
    };
    LoginPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    LoginPage.prototype.loginUser = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
        else {
            this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(function (data) {
                _this.zone.run(function () {
                    _this.app.getRootNav().setRoot(TabsPage);
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    console.log(error);
                    var alert = _this.alertCtrl.create({
                        message: error.message,
                        buttons: [{ text: "Okk", role: 'cancell' }]
                    });
                    alert.present();
                });
            });
            this.loading = this.loadingCtrl.create({
                dismissOnPageChange: true,
            });
            this.loading.present();
        }
    };
    LoginPage.prototype.goToResetPassword = function () {
        this.navCtrl.push(ResetpasswordPage);
    };
    LoginPage.prototype.createAccount = function () {
        this.navCtrl.push(SignupPage);
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function (mode) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.authService.login(mode)
            .then(function (data) {
            _this.authService.getFullProfile(data.uid)
                .first()
                .subscribe(function (user) {
                if (!(user.$value !== null)) {
                    console.log("Null User");
                    _this.authService.createAccount(data)
                        .then(function (_) {
                        loading.dismiss();
                        _this.navCtrl.setRoot(CreateProfilePage, { userid: data.uid });
                    }, function (error) { return _this.showMessage(error.message || 'Unknown error'); });
                }
                else {
                    loading.dismiss();
                    _this.navCtrl.setRoot(TabsPage);
                }
            }, function (error) {
                loading.dismiss();
                _this.showMessage(error.message || 'Unknown error');
            });
        }, function (error) {
            loading.dismiss();
            _this.showMessage(error.message || 'Unknown error');
        });
    };
    LoginPage.prototype.showMessage = function (message) {
        this.toastCtrl.create({ message: message, duration: 3000 }).present();
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        }), 
        __metadata('design:paramtypes', [NavController, LoadingController, ToastController, AuthService, FormBuilder, AlertController, App, NgZone])
    ], LoginPage);
    return LoginPage;
}());
//# sourceMappingURL=login.js.map