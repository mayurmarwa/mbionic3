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
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { ProductPagePage } from '../product-page/product-page';
import { FilterOptionsPage } from '../filter-options/filter-options';
/*
  Generated class for the CategoryProducts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CategoryProductsPage = (function () {
    function CategoryProductsPage(navCtrl, navParams, af, alertCtrl, modalCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        //this.category = navParams.get("category");
        this.catid = navParams.get("catid");
        this.title = navParams.get("cattitle");
        this.getProducts().then(function (data) { _this.buildArray(data); });
        //this.buildArray(this.productList);
        //console.log(this.productList);
    }
    CategoryProductsPage.prototype.getProducts = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.products = _this.af.database.list('/products', {
                query: {
                    orderByChild: "catid",
                    equalTo: _this.catid
                }, preserveSnapshot: true
            }).subscribe(function (snapshots) {
                _this.productList = [];
                _this.keys = [];
                snapshots.forEach(function (snapshot) {
                    _this.arrkey = _this.productList.push(snapshot.val());
                    _this.keys.push(snapshot.key);
                    //console.log(snapshot.key);
                });
                for (var i in _this.productList) {
                    _this.productList[i].key = _this.keys[i];
                }
                resolve(_this.productList);
                // console.log(random);
                //if (random == 1) {
                //   this.buildArray(this.productList);
                // }
            });
        });
    };
    CategoryProductsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CategoryProductsPage');
        console.log(this.catid);
    };
    CategoryProductsPage.prototype.openproductpage = function (product) {
        this.navCtrl.push(ProductPagePage, { product: product });
    };
    CategoryProductsPage.prototype.sortList = function (val) {
        var _this = this;
        this.getProducts().then(function () {
            if (val == 1) {
                _this.oby = 'mrate';
                _this.filterRateList('mrate');
            }
            else if (val == 2) {
                _this.oby = '-mrate';
                _this.filterRateList('mrate');
            }
            else if (val == 3) {
                _this.oby = 'krate';
                _this.filterRateList('krate');
            }
            else if (val == 4) {
                _this.oby = '-krate';
                _this.filterRateList('krate');
            }
            else if (val == 5) {
                _this.oby = '-timestamp';
            }
            else if (val == 6) {
                _this.oby = 'timestamp';
            }
        });
    };
    CategoryProductsPage.prototype.sortAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Select Sorting Option');
        alert.addInput({
            type: 'radio',
            label: 'Market Rate (Low to High)',
            value: '1',
        });
        alert.addInput({
            type: 'radio',
            label: 'Market Rate (High to Low)',
            value: '2'
        });
        alert.addInput({
            type: 'radio',
            label: 'Kalamboli Rate (Low to High)',
            value: '3',
        });
        alert.addInput({
            type: 'radio',
            label: 'Kalamboli Rate (High to Low)',
            value: '4'
        });
        alert.addInput({
            type: 'radio',
            label: 'Newest First',
            value: '5',
        });
        alert.addInput({
            type: 'radio',
            label: 'Oldest First',
            value: '6'
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'Sort',
            handler: function (data) {
                //console.log('Sort data:', data);
                _this.sortList(data);
                //this.testCheckboxOpen = false;
                //this.testCheckboxResult = data;
            }
        });
        alert.present();
    };
    CategoryProductsPage.prototype.filterRateList = function (filter) {
        //console.log(filter);
        //console.log(this.productList);
        this.productList = this.productList.filter(function (item) {
            //console.log(item);
            return item[filter];
        });
    };
    CategoryProductsPage.prototype.buildArray = function (array) {
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
            _this.productList = array;
            resolve(true);
        });
    };
    CategoryProductsPage.prototype.showFilter = function () {
        var showFilter = this.modalCtrl.create(FilterOptionsPage);
        showFilter.present();
        showFilter.onDidDismiss(function (data) {
            console.log("Data =>", data); //This will log the form entered by user in add modal.
        });
    };
    return CategoryProductsPage;
}());
CategoryProductsPage = __decorate([
    Component({
        selector: 'page-category-products',
        templateUrl: 'category-products.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire, AlertController, ModalController])
], CategoryProductsPage);
export { CategoryProductsPage };
//# sourceMappingURL=category-products.js.map