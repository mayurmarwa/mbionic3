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
import { AngularFire } from 'angularfire2';
import { ProductPagePage } from '../product-page/product-page';
/*
  Generated class for the CategoryProducts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CategoryProductsPage = (function () {
    function CategoryProductsPage(navCtrl, navParams, af) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.category = navParams.get("category");
        this.products = af.database.list('/products', {
            query: {
                orderByChild: "catid",
                equalTo: this.category.catid
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
            //console.log(this.productList);
        });
    }
    CategoryProductsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CategoryProductsPage');
    };
    CategoryProductsPage.prototype.openproductpage = function (product) {
        this.navCtrl.push(ProductPagePage, { product: product });
    };
    CategoryProductsPage.prototype.sortList = function () {
        this.productList = this.af.database.list('/products', {
            query: {
                orderByChild: "catid",
                equalTo: this.category.catid
            }
        });
    };
    return CategoryProductsPage;
}());
CategoryProductsPage = __decorate([
    Component({
        selector: 'page-category-products',
        templateUrl: 'category-products.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire])
], CategoryProductsPage);
export { CategoryProductsPage };
//# sourceMappingURL=category-products.js.map