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
import { LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { VerifyMobilePage } from '../verify-mobile/verify-mobile';
import firebase from 'firebase';
/*
  Generated class for the CreateProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CreateProfilePage = (function () {
    function CreateProfilePage(navCtrl, navParams, formBuilder, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.currentuser = firebase.auth().currentUser;
        this.userid = this.currentuser.uid;
        this.profileForm = formBuilder.group({
            //name: ['', Validators.required],
            mobile: ['', Validators.compose([Validators.minLength(10), Validators.required, Validators.maxLength(10)])],
            companyname: ['', Validators.required],
            address: ['', Validators.required],
            companyprofile: ['', Validators.required]
        });
    }
    CreateProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateProfilePage');
        console.log(this.userid);
    };
    CreateProfilePage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    CreateProfilePage.prototype.createProfile = function () {
        //this.submitAttempt = true;
        if (!this.profileForm.valid) {
            var toast = this.toastCtrl.create({
                message: 'Invalid Entries',
                duration: 2000,
                position: 'middle'
            });
            toast.present();
        }
        else {
            this.navCtrl.push(VerifyMobilePage, { form: this.profileForm, type: "social", userid: this.userid });
        }
    };
    return CreateProfilePage;
}());
CreateProfilePage = __decorate([
    Component({
        selector: 'page-create-profile',
        templateUrl: 'create-profile.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FormBuilder, LoadingController, ToastController])
], CreateProfilePage);
export { CreateProfilePage };
//# sourceMappingURL=create-profile.js.map