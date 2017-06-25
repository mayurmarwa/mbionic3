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
import { SendEnquiryPage } from '../send-enquiry/send-enquiry';
import { ProductData } from '../../providers/product-data';
import { Storage } from '@ionic/storage';
/*
  Generated class for the ProductPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ProductPagePage = (function () {
    function ProductPagePage(navCtrl, navParams, productData, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.productData = productData;
        this.storage = storage;
        this.prodImg = "";
        storage.ready().then(function () {
            storage.get('currentuser').then(function (val) {
                _this.currentuser = JSON.parse(val);
                _this.product = navParams.get("product");
                console.log(_this.product.catid);
                if (_this.product.catid == 1 || _this.product.catid === "8a" || _this.product.catid === "9a") {
                    _this.prodImg = "assets/img/1.png";
                }
                else if (_this.product.catid == 2 || _this.product.catid === "8b" || _this.product.catid === "9b") {
                    _this.prodImg = "assets/img/2.png";
                }
                else if (_this.product.catid == 3) {
                    _this.prodImg = "assets/img/3.png";
                }
                else if (_this.product.catid == 4 || _this.product.catid === "4a" || _this.product.catid === "4b" || _this.product.catid === "4c" || _this.product.catid === "4d" || _this.product.catid === "4e" || _this.product.catid === "8c" || _this.product.catid === "8c1" || _this.product.catid === "8c2" || _this.product.catid === "8c3" || _this.product.catid === "8c4" || _this.product.catid === "8c5" || _this.product.catid === "9c" || _this.product.catid === "9c1" || _this.product.catid === "9c2" || _this.product.catid === "9c3" || _this.product.catid === "9c4" || _this.product.catid === "9c5") {
                    _this.prodImg = "assets/img/4.png";
                }
                else if (_this.product.catid == 5) {
                    _this.prodImg = "assets/img/5.png";
                }
                else if (_this.product.catid == 6) {
                    _this.prodImg = "assets/img/6.png";
                }
                else if (_this.product.catid == 7 || _this.product.catid === "8d" || _this.product.catid === "9d") {
                    _this.prodImg = "assets/img/7.png";
                }
                else if (_this.product.catid == 10) {
                    _this.prodImg = "assets/img/10.png";
                }
                _this.productData.setRecent(_this.product);
                //console.log(this.currentuser);
            })
                .catch(function (err) {
                return console.log(err);
            });
        }).catch(function (err) {
            return console.log(err);
        });
    }
    ProductPagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductPagePage');
    };
    ProductPagePage.prototype.sendEnquiry = function () {
        this.navCtrl.push(SendEnquiryPage, { product: this.product });
    };
    return ProductPagePage;
}());
ProductPagePage = __decorate([
    Component({
        selector: 'page-product-page',
        templateUrl: 'product-page.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ProductData, Storage])
], ProductPagePage);
export { ProductPagePage };
//# sourceMappingURL=product-page.js.map