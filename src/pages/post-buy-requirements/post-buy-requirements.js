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
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import firebase from 'firebase';
/*
  Generated class for the PostBuyRequirements page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var PostBuyRequirementsPage = (function () {
    function PostBuyRequirementsPage(navCtrl, navParams, af, formBuilder, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.selecton = true;
        this.currentuser = firebase.auth().currentUser;
        this.requirements = af.database.list('/requirements');
        this.gradeList = af.database.list('/grades');
        this.requirementForm = formBuilder.group({
            category: ['', Validators.required],
            grade: ['', Validators.required],
            quantity: ['', Validators.required],
            unit: ['', Validators.required],
            bid: ['', Validators.required],
            details: ['', Validators.required],
            uid: ['', Validators.required],
        });
    }
    PostBuyRequirementsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PostBuyRequirementsPage');
    };
    PostBuyRequirementsPage.prototype.onTypeChange = function () {
        //console.log(this.typeOD);
        //console.log(this.seamlessForm.value.type);
        if (this.requirementForm.value.category === "Others") {
            this.selecton = false;
        }
        else {
            this.selecton = true;
        }
    };
    PostBuyRequirementsPage.prototype.showConfirm = function (requirementForm) {
        var _this = this;
        if (!requirementForm.valid) {
            var alert_1 = this.alertCtrl.create({
                title: 'Invalid Entries!',
                subTitle: 'Please fill all required entries',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            var confirm_1 = this.alertCtrl.create({
                title: 'Post Requirement?',
                message: 'Do you want to post this requirement to the market?',
                buttons: [
                    {
                        text: 'No',
                    },
                    {
                        text: 'Agree',
                        handler: function () {
                            _this.submitRequirement();
                        }
                    }
                ]
            });
            confirm_1.present();
        }
    };
    PostBuyRequirementsPage.prototype.submitRequirement = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Requrement Posted, Going Home...'
        });
        console.log(this.requirementForm.value);
        this.requirements.push(this.requirementForm.value).then(function (data) {
            console.log(data.key);
            _this.af.database.object('users/' + _this.currentuser.uid + '/requirements/' + data.key).set({
                islive: true,
                details: _this.requirementForm.value
            }).then(function (info) {
                _this.loading.present();
                setTimeout(function () {
                    _this.navCtrl.pop({ animate: false });
                }, 1000);
                setTimeout(function () {
                    _this.loading.dismiss();
                }, 3000);
            });
        });
    };
    return PostBuyRequirementsPage;
}());
PostBuyRequirementsPage = __decorate([
    Component({
        selector: 'page-post-buy-requirements',
        templateUrl: 'post-buy-requirements.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire, FormBuilder, AlertController, LoadingController])
], PostBuyRequirementsPage);
export { PostBuyRequirementsPage };
//# sourceMappingURL=post-buy-requirements.js.map