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
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { RequirementDetailsPage } from '../requirement-details/requirement-details';
import firebase from 'firebase';
/*
  Generated class for the BrowseRequirements page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var BrowseRequirementsPage = (function () {
    function BrowseRequirementsPage(navCtrl, navParams, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.loadingPopup = this.loadingCtrl.create({
            content: 'Loading...'
        });
        this.loadingPopup.present();
        this.requirementRef = firebase.database().ref('/requirements');
        this.requirementRef.on('value', function (memberList) {
            var members = [];
            memberList.forEach(function (country) {
                members.push(country.val());
            });
            _this.buildArray(members);
            //this.requirementList = members;
            //this.loadedlist = members;
            //this.loadingPopup.dismiss();
        });
    }
    BrowseRequirementsPage.prototype.buildArray = function (array) {
        var _this = this;
        return new Promise(function (resolve) {
            var m = array.length, t, i;
            // While there remain elements to shuffle�
            while (m) {
                // Pick a remaining element�
                i = Math.floor(Math.random() * m--);
                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            _this.requirementList = array;
            _this.loadedlist = array;
            _this.loadingPopup.dismiss();
            resolve(true);
        });
    };
    BrowseRequirementsPage.prototype.initializeItems = function () {
        this.requirementList = this.loadedlist;
    };
    BrowseRequirementsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BrowseRequirementsPage');
    };
    BrowseRequirementsPage.prototype.openrequirementpage = function (requirement) {
        this.navCtrl.push(RequirementDetailsPage, { requirement: requirement });
    };
    BrowseRequirementsPage.prototype.getItems = function (searchbar) {
        // Reset items back to all of the items
        this.initializeItems();
        // set q to the value of the searchbar
        var q = searchbar.srcElement.value;
        // if the value is an empty string don't filter the items
        if (!q) {
            return;
        }
        this.requirementList = this.requirementList.filter(function (v) {
            if (v.category && q) {
                if (v.category.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
        //console.log(q, this.directory.length);
    };
    return BrowseRequirementsPage;
}());
BrowseRequirementsPage = __decorate([
    Component({
        selector: 'page-browse-requirements',
        templateUrl: 'browse-requirements.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, LoadingController])
], BrowseRequirementsPage);
export { BrowseRequirementsPage };
//# sourceMappingURL=browse-requirements.js.map