var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AlertController, ActionSheetController, LoadingController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { AuthService } from '../../providers/auth.service';
import { ProfileData } from '../../providers/profile-data';
import firebase from 'firebase';
var TabProfilePage = (function () {
    function TabProfilePage(authService, loadingCtrl, toastCtrl, profileData, alertCtrl, actionSheetCtrl, camera) {
        var _this = this;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.profileData = profileData;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.user = {};
        //this.user.photoURL = 'assets/img/noimage.png';
        this.profileData = profileData;
        this.currentuser = firebase.auth().currentUser;
        //setTimeout(() => {
        if (this.currentuser) {
            this.sub1 = this.authService.getFullProfile(this.currentuser.uid)
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
            //this.sub2 = this.authService.currentUser
            //.subscribe(user => {
            //loading.dismiss();
            //this.user.displayName = user.displayName;
            //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
            //this.user.photoURL = user.photoURL || this.user.photoURL;
            //}, (error) => {
            //loading.dismiss();
            //console.log('Error: ' + JSON.stringify(error));
            //});
        }
        //}, 3000);
        /** this.profileData.getUserProfile().on('value', (data) => {
             this.userProfile = data.val();
             alert(this.userProfile);
             //this.birthDate = this.userProfile.birthDate;
         });**/
    }
    TabProfilePage.prototype.ionViewDidLoad = function () {
        /**if(!this.userProfile)
        let loading = this.loadingCtrl.create({
            content: 'Updating...'
        });
  
        loading.present();
  
        setTimeout(() => {
            loading.dismiss();
        }, 1500);**/
    };
    TabProfilePage.prototype.ionViewDidLeave = function () {
        this.sub1.unsubscribe();
        //this.sub2.unsubscribe();
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
                    type: 'number',
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
    TabProfilePage.prototype.updateLandLine = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Enter Land Line No.",
            inputs: [
                {
                    name: 'landline',
                    placeholder: 'Enter Land Line No. with STD code',
                    type: 'number',
                    value: this.userProfile.landline
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.profileData.updateLandLine(data.landline);
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
    TabProfilePage.prototype.updateExcise = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "Excise Details",
            inputs: [
                {
                    name: 'excise',
                    placeholder: 'ECC/Exc. Reg.Nos',
                    value: this.userProfile.excise
                },
                {
                    name: 'comsn',
                    placeholder: 'Commissionerate',
                    value: this.userProfile.comsn
                },
                {
                    name: 'range',
                    placeholder: 'Range',
                    value: this.userProfile.range
                },
                {
                    name: 'division',
                    placeholder: 'Division',
                    value: this.userProfile.division
                },
                {
                    name: 'vat',
                    placeholder: 'VAT TIN',
                    value: this.userProfile.vat
                },
                {
                    name: 'pan',
                    placeholder: 'PAN No. (optional)',
                    value: this.userProfile.pan
                }
                /**{
                    name: 'lastName',
                    placeholder: 'Your last name',
                    value: this.userProfile.lastName
                },**/
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        //console.log(data);
                        _this.checkExcise(data);
                    }
                }
            ]
        });
        alert.present();
    };
    TabProfilePage.prototype.checkExcise = function (data) {
        if (data.excise === '' || data.excise === null || data.comsn === '' || data.comsn == null || data.range === '' || data.range == null || data.division === '' || data.division === null || data.vat === '' || data.vat === null) {
            var alert_1 = this.alertCtrl.create({
                title: 'Invalid Entries!',
                subTitle: 'Please fill all required entries',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            this.profileData.updateExcise(data);
        }
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
    TabProfilePage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        //this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
                        _this.getPicture();
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        //this.takePicture(Camera.PictureSourceType.CAMERA);
                        _this.takePicture();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    TabProfilePage.prototype.takePicture = function () {
        var _this = this;
        this.camera.getPicture({
            quality: 95,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: this.camera.EncodingType.PNG,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: true
        }).then(function (imageData) {
            _this.productImage = imageData;
            _this.profileData.updateImage(_this.productImage);
            var toast = _this.toastCtrl.create({
                message: 'Image will be updated shortly',
                duration: 2000,
                position: 'middle'
            });
            toast.present();
            //this.productPreview = "data:image/jpeg;base64," + imageData;
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    TabProfilePage.prototype.getPicture = function () {
        var _this = this;
        this.camera.getPicture({
            quality: 95,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: false,
            encodingType: this.camera.EncodingType.PNG,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: true
        }).then(function (imageData) {
            _this.productImage = imageData;
            _this.profileData.updateImage(_this.productImage);
            var toast = _this.toastCtrl.create({
                message: 'Image will be updated shortly',
                duration: 2000,
                position: 'middle'
            });
            toast.present();
            //this.productPreview = "data:image/jpeg;base64," + imageData;
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    return TabProfilePage;
}());
TabProfilePage = __decorate([
    Component({
        selector: 'page-tab-profile',
        templateUrl: 'tab-profile.html'
    }),
    __metadata("design:paramtypes", [AuthService,
        LoadingController,
        ToastController,
        ProfileData,
        AlertController,
        ActionSheetController,
        Camera])
], TabProfilePage);
export { TabProfilePage };
//# sourceMappingURL=tab-profile.js.map