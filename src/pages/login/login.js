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
//import { CreateProfilePage } from '../create-profile/create-profile';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService, AuthMode } from '../../providers/auth.service';
import { EmailValidator } from '../../validators/email';
import { App } from 'ionic-angular';
import { NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
var LoginPage = (function () {
    function LoginPage(navCtrl, loadingCtrl, toastCtrl, authService, formBuilder, alertCtrl, app, zone, storage) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.zone = zone;
        this.storage = storage;
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
        this.login2();
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
    LoginPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    LoginPage.prototype.loginUser = function () {
        var _this = this;
        this.submitAttempt = true;
        this.loading = this.loadingCtrl.create();
        this.loading.present().then(function () {
            if (!_this.loginForm.valid) {
                _this.loading.dismiss().then(function () {
                    //console.log(error);
                    var toast = _this.toastCtrl.create({
                        message: 'Invalid Entries',
                        duration: 2000,
                        position: 'middle'
                    });
                    toast.present();
                });
            }
            else {
                _this.authService.loginUser(_this.loginForm.value.email, _this.loginForm.value.password).then(function () {
                    _this.loading.dismiss();
                    //this.storage.ready().then(() => {
                    // set a key/value
                    //this.storage.set('currentuser', JSON.stringify(data)).then(() => {
                    //this.loading.dismiss().then(() => {
                    //console.log(error);
                    //  this.navCtrl.setRoot(TabsPage);
                    //});
                    //}).catch((err) =>
                    //console.log(err));
                    // Or to get a key/value pair
                    // this.storage.get('currentuser').then((val) => {
                    //     console.log('Current User', JSON.parse(val));
                    //})
                    //}).catch((err) =>
                    //console.log(err));
                }).catch(function (err) {
                    _this.loading.dismiss().then(function () {
                        console.log(err);
                        var alert = _this.alertCtrl.create({
                            message: err.message,
                            buttons: [{ text: "Ok", role: 'cancel' }]
                        });
                        alert.present();
                    });
                });
            }
        });
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
        this.loading = this.loadingCtrl.create({
            content: 'Connecting To Google, Please Wait...',
            dismissOnPageChange: true
        });
        this.loading.present().then(function () {
            _this.authService.login(mode)
                .then(function () {
                _this.loading.dismiss();
                /* this.authService.getFullProfile(data.uid)
                   .first()
                   .subscribe((user) => {
                       if (!user.profiledone) {
                           console.log("Null User");
                       this.authService.createAccount(data)
                         .then( _=> {
                             this.loading.dismiss().then(() => {
                                 //console.log(error);
                                 this.navCtrl.setRoot(CreateProfilePage, { userid: data.uid });
                             });
                           
                         }).catch( (error)=> this.showMessage(error.message || 'Unknown error'));
                       } else {
         
                           this.storage.ready().then(() => {
                               // set a key/value
                               this.storage.set('currentuser', JSON.stringify(data)).then(() => {
                                   this.loading.dismiss().then(() => {
                                       //console.log(error);
                                       this.navCtrl.setRoot(TabsPage);
                                   });
                               }).catch((err) =>
                                   console.log(err));
                               // Or to get a key/value pair
                               // this.storage.get('currentuser').then((val) => {
                               //     console.log('Current User', JSON.parse(val));
                               //})
                           }).catch((err) =>
                               console.log(err));
                           
                       
                     }
                   }, (error)=> {
                       this.loading.dismiss().then(() => {
                           //console.log(error);
                           this.showMessage(error.message || 'Unknown error');
                       });
                     
                   });*/
            })
                .catch(function (error) {
                _this.loading.dismiss().then(function () {
                    //console.log(error);
                    _this.showMessage(error.message || 'Unknown error');
                });
            });
        });
    };
    LoginPage.prototype.login2 = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Connecting To Facebook, Please Wait...',
            dismissOnPageChange: true
        });
        this.loading.present().then(function () {
            _this.authService.login2();
            //.then(() => {
            //  this.loading.dismiss()
            /*console.log(data);
            this.authService.getFullProfile(data.uid)
                .first()
                .subscribe((user) => {
                    //console.log();
                    if (!user.profiledone) {
                        console.log("Null User");
                        this.authService.createAccount(data)
                            .then(_ => {
                                this.loading.dismiss().then(() => {
                                    //console.log(error);
                                    this.navCtrl.setRoot(CreateProfilePage, { userid: data.uid });
                                });
                                
                            }) .catch( (error) => this.showMessage(error.message || 'Unknown error'));
                    } else {

                        this.storage.ready().then(() => {
                            // set a key/value
                            this.storage.set('currentuser', JSON.stringify(data)).then(() => {
                                this.loading.dismiss().then(() => {
                                    //console.log(error);
                                    this.navCtrl.setRoot(TabsPage);
                                });
                            }).catch((err) =>
                                console.log(err));
                            // Or to get a key/value pair
                            // this.storage.get('currentuser').then((val) => {
                            //     console.log('Current User', JSON.parse(val));
                            //})
                        }).catch((err) =>
                            console.log(err));
                    }
                }, (error) => {
                    this.loading.dismiss().then(() => {
                        //console.log(error);
                        this.showMessage(error.message || 'Unknown error');
                    });
                });*/
            //})
            //.catch((error) => {
            //this.loading.dismiss().then(() => {
            //console.log(error);
            // this.showMessage(error.message || 'Unknown error');
            ///});
            // });
        });
    };
    LoginPage.prototype.showMessage = function (message) {
        this.toastCtrl.create({ message: message, duration: 3000 }).present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html'
    }),
    __metadata("design:paramtypes", [NavController,
        LoadingController,
        ToastController,
        AuthService,
        FormBuilder,
        AlertController,
        App,
        NgZone,
        Storage])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map