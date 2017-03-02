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
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { ProductPagePage } from '../product-page/product-page';
/*
  Generated class for the Market page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MarketPage = (function () {
    function MarketPage(navCtrl, navParams, modalCtrl, af) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.af = af;
        this.productList = af.database.list('/products', { query: { orderByChild: 'timestamp' } });
        this.productListRev = this.productList.map(function (arr) { return arr.reverse(); });
    }
    MarketPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MarketPage');
    };
    MarketPage.prototype.openproductpage = function (product) {
        this.navCtrl.push(ProductPagePage, { product: product });
    };
    return MarketPage;
}());
MarketPage = __decorate([
    Component({
        selector: 'page-market',
        templateUrl: 'market.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ModalController, AngularFire])
], MarketPage);
export { MarketPage };
//# sourceMappingURL=market.js.map