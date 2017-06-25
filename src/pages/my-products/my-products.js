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
import { SelectCategoryPage } from '../select-category/select-category';
import { EditProductPage } from '../edit-product/edit-product';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
/*
  Generated class for the MyProducts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MyProductsPage = (function () {
    function MyProductsPage(navCtrl, navParams, storage, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.currentuser = firebase.auth().currentUser;
        //storage.ready().then(() => {
        //storage.get('currentuser').then((val) => {
        //this.currentuser = JSON.parse(val);
        this.productListref = firebase.database().ref('/products').orderByChild("uid").equalTo(this.currentuser.uid);
        //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
        //   query: {
        //       orderByChild: "type",
        //       equalTo: this.segment
        //   }
        //});
        this.productListref.on('value', function (snapshot) {
            _this.myproducts = [];
            _this.keys = [];
            snapshot.forEach(function (country) {
                _this.myproducts.push(country.val());
                _this.keys.push(country.key);
            });
            for (var i in _this.myproducts) {
                _this.myproducts[i].key = _this.keys[i];
            }
            _this.updateList();
        });
        //})
        //  .catch((err) =>
        //    console.log(err));
        //}).catch((err) =>
        //  console.log(err)); 
        //this.currentuser = firebase.auth().currentUser;
    }
    MyProductsPage.prototype.ionViewDidLoad = function () {
        //this.segment = "received";
        //let loading = this.loadingCtrl.create({
        //    content: 'Updating...'
        //});
        //loading.present();
        //setTimeout(() => {
        //   loading.dismiss();
        //}, 3000);
    };
    MyProductsPage.prototype.ionViewDidEnter = function () {
    };
    MyProductsPage.prototype.updateList = function () {
        //this.myproducts = this.af.database.list('/products', {
        //    query: {
        //        orderByChild: "uid",
        //        equalTo: this.currentuser.uid } });
        //this.productListRev = this.myproducts.map((arr) => { return arr.reverse(); });
        this.productListRev = this.myproducts.reverse();
    };
    MyProductsPage.prototype.detailpage = function (myproduct) {
        this.navCtrl.push(EditProductPage, { myproduct: myproduct });
    };
    MyProductsPage.prototype.selectcat = function () {
        this.navCtrl.push(SelectCategoryPage);
    };
    MyProductsPage.prototype.addbulk = function () {
        this.navCtrl.push('AddBulkPage');
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
    __metadata("design:paramtypes", [NavController, NavParams, Storage, LoadingController])
], MyProductsPage);
export { MyProductsPage };
//# sourceMappingURL=my-products.js.map