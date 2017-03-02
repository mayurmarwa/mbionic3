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
import { SelectCategoryPage } from '../select-category/select-category';
import { EditProductPage } from '../edit-product/edit-product';
import firebase from 'firebase';
/*
  Generated class for the MyProducts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MyProductsPage = (function () {
    function MyProductsPage(navCtrl, navParams, af) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.currentuser = firebase.auth().currentUser;
        this.myproducts = af.database.list('/users/' + this.currentuser.uid + '/products/', { query: { orderByChild: 'timestamp' } });
        this.productListRev = this.myproducts.map(function (arr) { return arr.reverse(); });
    }
    MyProductsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyProductsPage');
    };
    MyProductsPage.prototype.detailpage = function (myproduct) {
        this.navCtrl.push(EditProductPage, { myproduct: myproduct });
    };
    MyProductsPage.prototype.selectcat = function () {
        this.navCtrl.push(SelectCategoryPage);
    };
    return MyProductsPage;
}());
MyProductsPage = __decorate([
    Component({
        selector: 'page-my-products',
        templateUrl: 'my-products.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire])
], MyProductsPage);
export { MyProductsPage };
//# sourceMappingURL=my-products.js.map