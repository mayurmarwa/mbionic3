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
import firebase from 'firebase';
/*
  Generated class for the PostBuyRequirements page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var PostBuyRequirementsPage = (function () {
    function PostBuyRequirementsPage(navCtrl, navParams, af, formBuilder, alertCtrl, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.selecton = true;
        this.nameon = true;
        this.selectalloyoff = true;
        this.emptyname = '';
        this.currentuser = firebase.auth().currentUser;
        this.currentuserid = this.currentuser.uid;
        this.requirements = af.database.list('/requirements');
        //this.gradeList = af.database.list('/grades');
        this.selectedCat = "Stainless Steel Coils";
        this.getGrades();
        this.requirementForm = formBuilder.group({
            category: ['Stainless Steel Coils', Validators.required],
            ptype: ['Hastelloy',],
            grade: ['', Validators.required],
            quantity: ['', Validators.required],
            unit: ['', Validators.required],
            bid: ['',],
            btype: [''],
            sizedetails: ['', Validators.required],
            details: ['',],
            uid: ['', Validators.required],
        });
    }
    PostBuyRequirementsPage.prototype.getGrades = function () {
        if (this.selectedCat == "Stainless Steel Coils" || this.selectedCat == "Stainless Steel Sheets" || this.selectedCat == "Stainless Steel Packets" || this.selectedCat === "Stainless Steel Seamless Pipes" || this.selectedCat === "Stainless Steel Welded/ERW Pipes" || this.selectedCat === "Stainless Steel Semi-Welded/ERW Pipes" || this.selectedCat === "Stainless Steel Electropolish Pipes" || this.selectedCat === "Stainless Steel Square & Rectangular Pipes" || this.selectedCat === "Stainless Steel Flats" || this.selectedCat == "Stainless Steel Angles" || this.selectedCat == "Stainless Steel Round Bars") {
            this.selecton = true;
            this.nameon = true;
            this.selectalloyoff = true;
            this.gradecat = 1;
        }
        else if (this.selectedCat === "Duplex & Super Duplex Coils" || this.selectedCat === "Duplex & Super Duplex Sheets" || this.selectedCat === "Duplex & Super Duplex Seamless Pipes" || this.selectedCat === "Duplex & Super Duplex Welded/ERW Pipes" || this.selectedCat === "Duplex & Super Duplex Semi-Welded/ERW Pipes" || this.selectedCat === "Duplex & Super Duplex Electropolish Pipes" || this.selectedCat === "Duplex & Super Duplex Sqr. & Rect. Pipes" || this.selectedCat === "Duplex & Super Duplex Round Bars") {
            this.selecton = true;
            this.nameon = true;
            this.selectalloyoff = true;
            this.gradecat = 2;
        }
        else if (this.selectedCat === "Nickel Alloys Coils" || this.selectedCat === "Nickel Alloys Sheets" || this.selectedCat === "Nickel Alloys Seamless Pipes" || this.selectedCat === "Nickel Alloys Welded/ERW Pipes" || this.selectedCat === "Nickel Alloys Semi-Welded/ERW Pipes" || this.selectedCat === "Nickel Alloys Electropolish Pipes" || this.selectedCat === "Nickel Alloys Sqr. & Rect. Pipes" || this.selectedCat === "Nickel Alloys Round Bars") {
            this.selecton = true;
            this.nameon = true;
            this.selectalloyoff = false;
            this.selectedAlloy = 'Hastelloy';
            this.gradecat = 3;
        }
        else if (this.selectedCat === "Others") {
            this.selecton = false;
            this.nameon = false;
            this.gradecat = 3;
        }
        else {
            this.gradecat = 1;
        }
        this.gradeList = this.af.database.list('/grades/' + this.gradecat);
    };
    PostBuyRequirementsPage.prototype.alloySelected = function () {
        if (this.selectedAlloy === 'Hastelloy') {
            this.gradecat = 3;
        }
        else if (this.selectedAlloy === 'Inconel') {
            this.gradecat = 4;
        }
        else if (this.selectedAlloy === 'Monel') {
            this.gradecat = 5;
        }
        else if (this.selectedAlloy === 'Nimonic') {
            this.gradecat = 6;
        }
        else if (this.selectedAlloy === 'Nickel') {
            this.gradecat = 7;
        }
        else if (this.selectedAlloy === 'Titanium') {
            this.gradecat = 8;
        }
        this.gradeList = this.af.database.list('/grades/' + this.gradecat);
    };
    PostBuyRequirementsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PostBuyRequirementsPage');
    };
    PostBuyRequirementsPage.prototype.showConfirm = function (requirementForm) {
        var _this = this;
        if (this.selectedCat != "Exotic Alloys Coils" || this.selectedCat != "Exotic Alloys Sheets" || this.selectedCat != "Exotic Alloys Seamless Pipes" || this.selectedCat != "Exotic Alloys Welded/ERW Pipes" || this.selectedCat != "Exotic Alloys Electropolish Pipes" || this.selectedCat != "Exotic Alloys Sqr. & Rect. Pipes" || this.selectedCat != "Exotic Alloys Round Bars") {
            requirementForm.value.ptype = null;
        }
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
            content: 'Posting Requirement...'
        });
        this.loading.present().then(function () {
            console.log(_this.requirementForm.value);
            _this.requirements.push(_this.requirementForm.value).then(function (data) {
                console.log(data.key);
                _this.af.database.object('users/' + _this.currentuser.uid + '/requirements/' + data.key).set({
                    islive: true,
                    details: _this.requirementForm.value
                }).then(function () {
                    _this.loading.dismiss().then(function () {
                        var toast = _this.toastCtrl.create({
                            message: 'Requirement posted. Check My Requirements for details...',
                            duration: 3500,
                            position: 'middle'
                        });
                        toast.present();
                        _this.navCtrl.pop();
                    });
                })
                    .catch(function (err) {
                    _this.loading.dismiss().then(function () {
                        console.log(err);
                        var alert = _this.alertCtrl.create({
                            message: err.message,
                            buttons: [{ text: "Ok", role: 'cancel' }]
                        });
                        alert.present();
                    });
                });
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
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire, FormBuilder, AlertController, LoadingController, ToastController])
], PostBuyRequirementsPage);
export { PostBuyRequirementsPage };
//# sourceMappingURL=post-buy-requirements.js.map