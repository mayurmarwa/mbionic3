var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { ProfileData } from '../../providers/profile-data';
import firebase from 'firebase';
export var TabProfilePage = (function () {
    function TabProfilePage(authService, loadingCtrl, profileData, alertCtrl) {
        var _this = this;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.profileData = profileData;
        this.alertCtrl = alertCtrl;
        this.user = {};
        this.user.photoURL = 'assets/img/noimage.png';
        this.profileData = profileData;
        this.currentuser = firebase.auth().currentUser;
        this.authService.getFullProfile(this.currentuser.uid)
            .subscribe(function (user) {
            //loading.dismiss();
            // this.user.displayName = user.displayName;
            //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
            //this.user.photoURL = user.photoURL || this.user.photoURL;
            _this.userProfile = user;
        }, function (error) {
            //loading.dismiss();
            console.log('Error: ' + JSON.stringify(error));
        });
        /** this.profileData.getUserProfile().on('value', (data) => {
             this.userProfile = data.val();
             alert(this.userProfile);
             //this.birthDate = this.userProfile.birthDate;
         });**/
    }
    TabProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.authService.currentUser
            .subscribe(function (user) {
            loading.dismiss();
            _this.user.displayName = user.displayName;
            _this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
            _this.user.photoURL = user.photoURL || _this.user.photoURL;
        }, function (error) {
            loading.dismiss();
            console.log('Error: ' + JSON.stringify(error));
        });
        console.log(this.userProfile);
    };
    TabProfilePage.prototype.updateName = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Your name",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Your name',
                    value: this.userProfile.name
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.profileData.updateName(data.name);
                    }
                }
            ]
        });
        alert.present();
    };
    TabProfilePage.prototype.updateMobile = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Mobile No. (+91)",
            inputs: [
                {
                    name: 'mobile',
                    placeholder: 'Mobile No.',
                    value: this.userProfile.mobile
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.profileData.updateMobile(data.mobile);
                    }
                }
            ]
        });
        alert.present();
    };
    TabProfilePage.prototype.updateAddress = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Company Address",
            inputs: [
                {
                    name: 'address',
                    placeholder: 'Address',
                    value: this.userProfile.address
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.profileData.updateAddress(data.address);
                    }
                }
            ]
        });
        alert.present();
    };
    TabProfilePage.prototype.updateCompanyName = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Your Company Name",
            inputs: [
                {
                    name: 'companyname',
                    placeholder: 'Your Company Name',
                    value: this.userProfile.companyname
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.profileData.updateCompanyName(data.companyname);
                    }
                }
            ]
        });
        alert.present();
    };
    TabProfilePage.prototype.updateCompanyProfile = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Company Profile",
            inputs: [
                {
                    name: 'companyprofile',
                    placeholder: 'Company Profile',
                    value: this.userProfile.companyprofile
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.profileData.updateCompanyProfile(data.companyprofile);
                    }
                }
            ]
        });
        alert.present();
    };
    TabProfilePage.prototype.updateEmail = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            inputs: [
                {
                    name: 'newEmail',
                    placeholder: 'Your new email',
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.profileData.updateEmail(data.newEmail);
                    }
                }
            ]
        });
        alert.present();
    };
    TabProfilePage.prototype.updatePassword = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            inputs: [
                {
                    name: 'newPassword',
                    placeholder: 'Your new password',
                    type: 'password'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.profileData.updatePassword(data.newPassword);
                    }
                }
            ]
        });
        alert.present();
    };
    TabProfilePage = __decorate([
        Component({
            selector: 'page-tab-profile',
            templateUrl: 'tab-profile.html'
        }), 
        __metadata('design:paramtypes', [AuthService, LoadingController, ProfileData, AlertController])
    ], TabProfilePage);
    return TabProfilePage;
}());
//# sourceMappingURL=tab-profile.js.map