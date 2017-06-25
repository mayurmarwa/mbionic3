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
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { RequirementDetailsPage } from '../requirement-details/requirement-details';
import { MyRequirementsPage } from '../my-requirements/my-requirements';
import { ProductData } from '../../providers/product-data';
/*
  Generated class for the BrowseRequirements page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var BrowseRequirementsPage = (function () {
    function BrowseRequirementsPage(navCtrl, navParams, productData, loadingCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.productData = productData;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.end = false;
        this.loadingPopup = this.loadingCtrl.create({
            content: 'Loading...'
        });
        //this.requirementRef = firebase.database().ref('/requirements');
        this.members = this.productData.requirements;
        this.requirementList = this.productData.requirements;
        this.loadedlist = this.productData.requirements;
        this.buildArray(this.requirementList);
        //this.buildArray(this.members);
        //this.requirementList = members;
        //this.loadedlist = members;
        //this.loadingPopup.dismiss();
    }
    BrowseRequirementsPage.prototype.doInfinite = function (infiniteScroll) {
        //console.log(this.startNumber);
        this.infiniteScroll = infiniteScroll;
        console.log(this.requirementList.length);
        if (this.requirementList.length > 20) {
            if (this.requirementList.length < 40) {
                for (var i = this.startNumber; i < this.requirementList.length; i++) {
                    this.displayList.push(this.requirementList[i]);
                    //this.displayList.push(i);
                }
            }
            else {
                for (var i = this.startNumber; i < this.endNumber; i++) {
                    this.displayList.push(this.requirementList[i]);
                    //this.displayList.push(i);
                }
            }
            if (this.end) {
                infiniteScroll.enable(false);
            }
            else {
                this.startNumber = this.endNumber;
                if (this.endNumber + 20 > this.requirementList.length) {
                    this.endNumber = this.requirementList.length;
                    this.end = true;
                }
                else {
                    this.endNumber = this.endNumber + 20;
                }
            }
        }
        else {
            infiniteScroll.enable(false);
        }
        //console.log("start", this.startNumber);
        //console.log("i", i);
        infiniteScroll.complete();
    };
    BrowseRequirementsPage.prototype.ionViewDidEnter = function () {
    };
    BrowseRequirementsPage.prototype.buildArray = function (array) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.startNumber = 20;
            _this.endNumber = 40;
            _this.end = false;
            _this.displayList = [];
            if (_this.infiniteScroll) {
                _this.infiniteScroll.enable(true);
            }
            /**let m = array.length, t, i;

            // While there remain elements to shuffle�
            while (m) {

                // Pick a remaining element�
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }

            this.productList = array;
            this.backupList = array;**/
            if (array.length < 20) {
                for (var i = 0; i < array.length; i++) {
                    _this.displayList.push(array[i]);
                    //this.displayList.push(i);
                }
            }
            else {
                for (var i = 0; i < 20; i++) {
                    _this.displayList.push(array[i]);
                    //this.displayList.push(i);
                }
            }
            //this.loadingPopup.dismiss().then(() => {
            resolve(true);
            //});
        });
    };
    BrowseRequirementsPage.prototype.initializeItems = function () {
        this.requirementList = this.loadedlist;
        this.buildArray(this.requirementList);
    };
    BrowseRequirementsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BrowseRequirementsPage');
    };
    BrowseRequirementsPage.prototype.openrequirementpage = function (requirement) {
        this.navCtrl.push(RequirementDetailsPage, { requirement: requirement });
    };
    BrowseRequirementsPage.prototype.openmyrequirements = function () {
        this.navCtrl.push(MyRequirementsPage);
        //.then(() => {
        // first we find the index of the current view controller:
        //const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        //this.navCtrl.remove(index);
        //});
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
            if (v.category && v.grade && q) {
                var search = v.category + ' ' + v.grade;
                var search2 = v.grade + ' ' + v.category;
                if (search.toLowerCase().indexOf(q.toLowerCase()) > -1 || search2.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
            else {
                if (v.category && q) {
                    if (v.category.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                        return true;
                    }
                    return false;
                }
            }
        });
        console.log(q, this.requirementList.length);
        this.buildArray(this.requirementList);
        //console.log(q, this.directory.length);
    };
    return BrowseRequirementsPage;
}());
BrowseRequirementsPage = __decorate([
    Component({
        selector: 'page-browse-requirements',
        templateUrl: 'browse-requirements.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ProductData, LoadingController, ViewController])
], BrowseRequirementsPage);
export { BrowseRequirementsPage };
//# sourceMappingURL=browse-requirements.js.map