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
import { RequirementDetailsPage } from '../requirement-details/requirement-details';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
/*
  Generated class for the MyRequirements page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MyRequirementsPage = (function () {
    function MyRequirementsPage(navCtrl, navParams, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.currentuser = firebase.auth().currentUser;
        //storage.ready().then(() => {
        // storage.get('currentuser').then((val) => {
        //this.currentuser = JSON.parse(val);
        this.requirementListref = firebase.database().ref('/requirements').orderByChild("uid").equalTo(this.currentuser.uid);
        //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
        //   query: {
        //       orderByChild: "type",
        //       equalTo: this.segment
        //   }
        //});
        this.requirementListref.on('value', function (snapshot) {
            _this.requirementList = [];
            _this.keys = [];
            snapshot.forEach(function (country) {
                _this.requirementList.push(country.val());
                _this.keys.push(country.key);
            });
            for (var i in _this.requirementList) {
                _this.requirementList[i].key = _this.keys[i];
            }
            _this.updateList();
        });
        //})
        // .catch((err) =>
        //   console.log(err));
        //}).catch((err) =>
        //  console.log(err)); 
    }
    MyRequirementsPage.prototype.openrequirementpage = function (requirement) {
        this.navCtrl.push(RequirementDetailsPage, { requirement: requirement });
    };
    MyRequirementsPage.prototype.updateList = function () {
        //this.myproducts = this.af.database.list('/products', {
        //    query: {
        //        orderByChild: "uid",
        //        equalTo: this.currentuser.uid } });
        //this.productListRev = this.myproducts.map((arr) => { return arr.reverse(); });
        this.requirementListRev = this.requirementList.reverse();
    };
    MyRequirementsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyRequirementsPage');
    };
    return MyRequirementsPage;
}());
MyRequirementsPage = __decorate([
    Component({
        selector: 'page-my-requirements',
        templateUrl: 'my-requirements.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Storage])
], MyRequirementsPage);
export { MyRequirementsPage };
//# sourceMappingURL=my-requirements.js.map