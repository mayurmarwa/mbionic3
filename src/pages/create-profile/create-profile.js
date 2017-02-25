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
import { LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { TabsPage } from '../tabs/tabs';
import { App } from 'ionic-angular';
/*
  Generated class for the CreateProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CreateProfilePage = (function () {
    function CreateProfilePage(af, navCtrl, navParams, formBuilder, loadingCtrl, alertCtrl, app) {
        this.af = af;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.userid = navParams.get("userid");
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
            console.log(this.profileForm.value);
        }
        else {
            this.af.database.list('/users').update(this.userid, {
                //name: userdata.value.name,
                mobile: this.profileForm.value.mobile,
                companyname: this.profileForm.value.companyname,
                address: this.profileForm.value.address,
                companyprofile: this.profileForm.value.companyprofile
                //email: userdata.value.email,
                //uid: authdata.auth.uid,
                //photoURL: data.auth.photoURL,
                //createdAt: firebase.database['ServerValue']['TIMESTAMP'],
                //providerData: authdata.auth.provider
            });
            this.app.getRootNav().setRoot(TabsPage);
        }
    };
    return CreateProfilePage;
}());
CreateProfilePage = __decorate([
    Component({
        selector: 'page-create-profile',
        templateUrl: 'create-profile.html'
    }),
    __metadata("design:paramtypes", [AngularFire, NavController, NavParams, FormBuilder, LoadingController,
        AlertController, App])
], CreateProfilePage);
export { CreateProfilePage };
//# sourceMappingURL=create-profile.js.map