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
import { SelectCategoryPage } from '../select-category/select-category';
import { EditProductPage } from '../edit-product/edit-product';
import { Storage } from '@ionic/storage';
/*
  Generated class for the MyProducts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MyProductsPage = (function () {
    function MyProductsPage(navCtrl, navParams, af, storage, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        storage.ready().then(function () {
            storage.get('currentuser').then(function (val) {
                _this.currentuser = JSON.parse(val);
                _this.segment = "uploaded";
            })
                .catch(function (err) {
                return console.log(err);
            });
        }).catch(function (err) {
            return console.log(err);
        });
        //this.currentuser = firebase.auth().currentUser;
    }
    MyProductsPage.prototype.ionViewDidLoad = function () {
    };
    MyProductsPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter MyProductsPage');
        this.loadingPopup = this.loadingCtrl.create({
            content: 'Loading...'
        });
        this.loadingPopup.present();
        this.updateList();
    };
    MyProductsPage.prototype.updateList = function () {
        this.myproducts = this.af.database.list('/products', {
            query: {
                orderByChild: "uid",
                equalTo: this.currentuser.uid
            }
        });
        this.productListRev = this.myproducts.map(function (arr) { return arr.reverse(); });
        this.loadingPopup.dismiss();
    };
    MyProductsPage.prototype.detailpage = function (myproduct) {
        this.navCtrl.push(EditProductPage, { myproduct: myproduct });
    };
    MyProductsPage.prototype.selectcat = function () {
        this.navCtrl.push(SelectCategoryPage);
    };
    MyProductsPage.prototype.uploadProduct = function () {
        if (this.segment === 'add') {
            this.navCtrl.push(SelectCategoryPage);
        }
    };
    return MyProductsPage;
}());
MyProductsPage = __decorate([
    Component({
        selector: 'page-my-products',
        templateUrl: 'my-products.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire, Storage, LoadingController])
], MyProductsPage);
export { MyProductsPage };
//# sourceMappingURL=my-products.js.map