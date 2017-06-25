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
import { ProductPagePage } from '../product-page/product-page';
import { AngularFire } from 'angularfire2';
import { ProductData } from '../../providers/product-data';
/*
  Generated class for the QuickFilter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var QuickFilterPage = (function () {
    function QuickFilterPage(navCtrl, navParams, productData, af, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.productData = productData;
        this.af = af;
        this.loadingCtrl = loadingCtrl;
        this.end = false;
        this.loadingPopup = this.loadingCtrl.create({
            content: 'Filtering...'
        });
        this.catid = navParams.get("catid");
        this.grade = navParams.get("grade");
        this.alloy = navParams.get("alloy");
        //this.loadingPopup.present().then(() => {
        this.getProducts().then(function (data) { _this.buildArray(data).then(function () { _this.filterList(); }); });
        //});
    }
    QuickFilterPage.prototype.doInfinite = function (infiniteScroll) {
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
    QuickFilterPage.prototype.getProducts = function () {
        var _this = this;
        return new Promise(function (resolve) {
            /**this.products = this.af.database.list('/products', {
                query: {
                    orderByChild: "catid",
                    equalTo: this.catid
                }, preserveSnapshot: true
            }).first().subscribe(snapshots => {
                this.productList = [];
                this.keys = [];
                snapshots.forEach(snapshot => {
                    this.arrkey = this.productList.push(snapshot.val());
                    this.keys.push(snapshot.key);
                    //console.log(snapshot.key);
                }, (error) => {
                    //loading.dismiss();
                    console.log('Error: ' + JSON.stringify(error));
                });
                for (var i in this.productList) {
                    this.productList[i].key = this.keys[i];
                } **/
            _this.productList = _this.productData.products.filter(function (item) {
                //console.log(item);
                return (item['catid'] === _this.catid);
            });
            resolve(_this.productList);
            // console.log(random);
            //if (random == 1) {
            //   this.buildArray(this.productList);
            // }
            //})
        });
    };
    QuickFilterPage.prototype.buildArray = function (array) {
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
    QuickFilterPage.prototype.openproductpage = function (product) {
        this.navCtrl.push(ProductPagePage, { product: product });
    };
    QuickFilterPage.prototype.filterList = function () {
        //console.log(this.alloy);
        var _this = this;
        if (this.alloy) {
            this.displayList = this.displayList.filter(function (item) {
                //console.log(item);
                //console.log(item['gradeval']);
                return (item['gradeval'] === _this.grade && item['ptype'] === _this.alloy);
            });
        }
        else {
            this.displayList = this.displayList.filter(function (item) {
                //console.log(item);
                console.log(item['gradeval']);
                return (item['gradeval'] === _this.grade);
            });
        }
    };
    QuickFilterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QuickFilterPage');
    };
    return QuickFilterPage;
}());
QuickFilterPage = __decorate([
    Component({
        selector: 'page-quick-filter',
        templateUrl: 'quick-filter.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ProductData, AngularFire, LoadingController])
], QuickFilterPage);
export { QuickFilterPage };
//# sourceMappingURL=quick-filter.js.map