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
import { AngularFire } from 'angularfire2';
import { ProductPagePage } from '../product-page/product-page';
import { ProductData } from '../../providers/product-data';
/*
  Generated class for the SearchCategories page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SearchCategoriesPage = (function () {
    function SearchCategoriesPage(navCtrl, navParams, productData, af, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.productData = productData;
        this.af = af;
        this.loadingCtrl = loadingCtrl;
        this.end = false;
        this.productList = this.productData.products;
        this.backupList = this.productData.products;
        this.buildArray(this.productList);
        /** this.loadingPopup = this.loadingCtrl.create({
             content: 'Loading...'
         });
         this.loadingPopup.present().then(() => {
             console.log(this.productList);
             this.buildArray(this.productList);
         });**/
        //this.category = navParams.get("category");
        //this.getProducts().then(data => { this.buildArray(data); this.loadingPopup.dismiss(); });
        //this.buildArray(this.productList);
        //console.log(this.productList);
    }
    SearchCategoriesPage.prototype.doInfinite = function (infiniteScroll) {
        //console.log(this.startNumber);
        this.infiniteScroll = infiniteScroll;
        console.log(this.productList.length);
        if (this.productList.length > 20) {
            if (this.productList.length < 40) {
                for (var i = this.startNumber; i < this.productList.length; i++) {
                    this.displayList.push(this.productList[i]);
                    //this.displayList.push(i);
                }
            }
            else {
                for (var i = this.startNumber; i < this.endNumber; i++) {
                    this.displayList.push(this.productList[i]);
                    //this.displayList.push(i);
                }
            }
            if (this.end) {
                infiniteScroll.enable(false);
            }
            else {
                this.startNumber = this.endNumber;
                if (this.endNumber + 20 > this.productList.length) {
                    this.endNumber = this.productList.length;
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
    SearchCategoriesPage.prototype.getProducts = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.products = _this.af.database.list('/products', { preserveSnapshot: true }).first().subscribe(function (snapshots) {
                _this.productList = [];
                _this.keys = [];
                snapshots.forEach(function (snapshot) {
                    _this.arrkey = _this.productList.push(snapshot.val());
                    _this.keys.push(snapshot.key);
                    //console.log(snapshot.key);
                }, function (error) {
                    //loading.dismiss();
                    console.log('Error: ' + JSON.stringify(error));
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
    SearchCategoriesPage.prototype.buildArray = function (array) {
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
    SearchCategoriesPage.prototype.initializeItems = function () {
        this.productList = this.backupList;
        this.buildArray(this.productList);
    };
    SearchCategoriesPage.prototype.getItems = function (searchbar) {
        // Reset items back to all of the items
        this.initializeItems();
        // set q to the value of the searchbar
        var q = searchbar.srcElement.value;
        // if the value is an empty string don't filter the items
        if (!q) {
            return;
        }
        this.productList = this.productList.filter(function (v) {
            if (v.name && v.ptype && q) {
                var search = v.name + ' ' + v.ptype;
                var search2 = v.ptype + ' ' + v.name;
                //console.log(search);
                if (search.toLowerCase().indexOf(q.toLowerCase()) > -1 || search2.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
            else if (v.name && v.gradeval && q) {
                var search = v.name + ' ' + v.gradeval;
                var search2 = v.gradeval + ' ' + v.name;
                if (search.toLowerCase().indexOf(q.toLowerCase()) > -1 || search2.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
            else {
                if (v.name && q) {
                    if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                        return true;
                    }
                    return false;
                }
            }
        });
        console.log(q, this.productList.length);
        this.buildArray(this.productList);
    };
    SearchCategoriesPage.prototype.openproductpage = function (product) {
        this.navCtrl.push(ProductPagePage, { product: product });
    };
    SearchCategoriesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchCategoriesPage');
    };
    return SearchCategoriesPage;
}());
SearchCategoriesPage = __decorate([
    Component({
        selector: 'page-search-categories',
        templateUrl: 'search-categories.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ProductData, AngularFire, LoadingController])
], SearchCategoriesPage);
export { SearchCategoriesPage };
//# sourceMappingURL=search-categories.js.map