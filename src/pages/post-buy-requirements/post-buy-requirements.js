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
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import firebase from 'firebase';
/*
  Generated class for the PostBuyRequirements page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var PostBuyRequirementsPage = (function () {
    function PostBuyRequirementsPage(navCtrl, navParams, af, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.formBuilder = formBuilder;
        this.currentuser = firebase.auth().currentUser;
        this.requirements = af.database.list('/requirements');
        this.requirementForm = formBuilder.group({
            category: ['', Validators.required],
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
    PostBuyRequirementsPage.prototype.submitRequirement = function () {
        var _this = this;
        console.log(this.requirementForm.value);
        this.requirements.push(this.requirementForm.value).then(function (data) {
            console.log(data.key);
            _this.af.database.object('users/' + _this.currentuser.uid + '/requirements/' + data.key).set({
                islive: true,
                details: _this.requirementForm.value
            }).then(function (info) {
                console.log("success");
                _this.navCtrl.pop();
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
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire, FormBuilder])
], PostBuyRequirementsPage);
export { PostBuyRequirementsPage };
//# sourceMappingURL=post-buy-requirements.js.map