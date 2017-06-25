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
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { QuickFilterPage } from '../quick-filter/quick-filter';
import { SearchCategoriesPage } from '../search-categories/search-categories';
import { PostBuyRequirementsPage } from '../post-buy-requirements/post-buy-requirements';
import { CategoryProductsPage } from '../category-products/category-products';
import { AngularFire } from 'angularfire2';
import { ProductPagePage } from '../product-page/product-page';
import { SelectSubcatPage } from '../select-subcat/select-subcat';
import { ProductData } from '../../providers/product-data';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
/*
  Generated class for the Market page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MarketPage = (function () {
    function MarketPage(navCtrl, toastCtrl, productData, navParams, modalCtrl, af, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.productData = productData;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.af = af;
        this.storage = storage;
        this.viewall = false;
        this.selectalloyoff = true;
        //this.productList = af.database.list('/products',{query: {orderByChild: 'timestamp' }});
        this.currentUser = firebase.auth().currentUser;
        //this.categories = af.database.list('/productcategories', { query: { orderByChild: 'catid' } });
        storage.ready().then(function () {
            storage.get('currentuser').then(function (val) {
                _this.currentuser = JSON.parse(val);
                //this.recentList = this.af.database.list();
                _this.recentListRef = firebase.database().ref('/users/' + _this.currentUser.uid + '/recent');
                //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
                //   query: {
                //       orderByChild: "type",
                //       equalTo: this.segment
                //   }
                //});
                _this.recentListRef.on('value', function (snapshot) {
                    //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
                    //query: {
                    //    orderByChild: "type",
                    //    equalTo: this.segment
                    // }
                    //});
                    //console.log("received");
                    //this.enqListRev = [];
                    //console.log(snapshot.numChildren());
                    if (snapshot.numChildren() > 1) {
                        _this.recentl = [];
                        //this.keys = [];
                        snapshot.forEach(function (country) {
                            _this.recentl.push(country.val());
                            _this.flag = true;
                            //this.keys.push(country.key);
                        });
                    }
                    else {
                        _this.flag = false;
                    }
                    //this.enqListRev = this.enquiryList.reverse();
                    if (_this.flag == true) {
                        _this.recentList = Observable.of(_this.recentl);
                        //console.log(this.recentList);
                    }
                    //console.log(this.flag);
                });
            });
        });
    }
    MarketPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MarketPage');
    };
    //ionViewDidEnter() {
    //    this.reverseList();
    //}
    //reverseList() {
    //   this.productList = this.af.database.list('/products', { query: { orderByChild: 'timestamp' } });
    //   this.productListRev = this.productList.map((arr) => { return arr.reverse(); });
    // }
    MarketPage.prototype.getGrades = function () {
        var _this = this;
        this.selectedGrade = "";
        if (this.selectedCat == 1 || this.selectedCat == 2 || this.selectedCat == 3 || this.selectedCat === '4a' || this.selectedCat === '4b' || this.selectedCat === '4c' || this.selectedCat === '4d' || this.selectedCat === '4e' || this.selectedCat == 5 || this.selectedCat == 6 || this.selectedCat == 7) {
            if (this.selectedCat == 1 || this.selectedCat == 2 || this.selectedCat == 3 || this.selectedCat == 5 || this.selectedCat == 6 || this.selectedCat == 7) {
                this.selectedCat = parseInt(this.selectedCat);
            }
            this.gradecat = 1;
            this.selectalloyoff = true;
        }
        else if (this.selectedCat === '8a' || this.selectedCat === '8b' || this.selectedCat === '8c1' || this.selectedCat === '8c2' || this.selectedCat === '8c3' || this.selectedCat === '8c4' || this.selectedCat === '8c5' || this.selectedCat === '8d') {
            this.gradecat = 2;
            this.selectalloyoff = true;
        }
        else if (this.selectedCat === '9a' || this.selectedCat === '9b' || this.selectedCat === '9c1' || this.selectedCat === '9c2' || this.selectedCat === '9c3' || this.selectedCat === '9c4' || this.selectedCat === '9c5' || this.selectedCat === '9d') {
            this.selectalloyoff = false;
            this.selectedAlloy = 'Hastelloy';
            this.gradecat = 3;
        }
        else {
            this.gradecat = 1;
        }
        //this.gradeList = this.af.database.list('/grades/' + this.gradecat);
        this.gradeListRef = firebase.database().ref('/grades/' + this.gradecat);
        this.gradeListRef.on('value', function (snapshot) {
            _this.gradeList = [];
            //this.keys = [];
            snapshot.forEach(function (country) {
                _this.gradeList.push(country.val().Grade);
                //this.keys.push(country.key);
            });
            //this.enqListRev = this.enquiryList.reverse();
            _this.gradeList = Observable.of(_this.gradeList);
        });
    };
    MarketPage.prototype.alloySelected = function () {
        var _this = this;
        this.selectedGrade = "";
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
        this.gradeListRef = firebase.database().ref('/grades/' + this.gradecat);
        this.gradeListRef.on('value', function (snapshot) {
            _this.gradeList = [];
            //this.keys = [];
            snapshot.forEach(function (country) {
                _this.gradeList.push(country.val().Grade);
                //this.keys.push(country.key);
            });
            //this.enqListRev = this.enquiryList.reverse();
            _this.gradeList = Observable.of(_this.gradeList);
        });
    };
    MarketPage.prototype.quickFilter = function () {
        if (!this.selectedCat || !this.selectedGrade || this.selectedGrade === "") {
            var toast = this.toastCtrl.create({
                message: 'Select All Filters',
                duration: 2000,
                position: 'middle'
            });
            toast.present();
        }
        else {
            this.navCtrl.push(QuickFilterPage, { catid: this.selectedCat, grade: this.selectedGrade, alloy: this.selectedAlloy });
        }
    };
    MarketPage.prototype.openproductpage = function (product) {
        this.navCtrl.push(ProductPagePage, { product: product });
    };
    MarketPage.prototype.opennotificationsPage = function (product) {
        this.navCtrl.push(NotificationsPage);
    };
    MarketPage.prototype.selectSub = function (catid) {
        this.navCtrl.push(SelectSubcatPage, { catid: catid });
    };
    MarketPage.prototype.categoryProducts = function (catid, title) {
        //console.log(category);
        this.navCtrl.push(CategoryProductsPage, { catid: catid, cattitle: title });
    };
    MarketPage.prototype.openNotificationsPage = function () {
        this.navCtrl.push(NotificationsPage);
    };
    MarketPage.prototype.openSearchPage = function () {
        this.navCtrl.push(SearchCategoriesPage);
    };
    MarketPage.prototype.openRequirementPage = function () {
        this.navCtrl.push(PostBuyRequirementsPage);
    };
    return MarketPage;
}());
MarketPage = __decorate([
    Component({
        selector: 'page-market',
        templateUrl: 'market.html'
    }),
    __metadata("design:paramtypes", [NavController, ToastController, ProductData, NavParams, ModalController, AngularFire, Storage])
], MarketPage);
export { MarketPage };
//# sourceMappingURL=market.js.map