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
import { AddProductPage } from '../add-product/add-product';
/*
  Generated class for the SelectCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SelectCategoryPage = (function () {
    function SelectCategoryPage(navCtrl, navParams, af) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.categories = af.database.list('/productcategories', { query: { orderByChild: 'catid' } });
    }
    SelectCategoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SelectCategoryPage');
    };
    SelectCategoryPage.prototype.detailpage = function (category) {
        if (category.catid === 4 || category.catid === 8 || category.catid === 9) {
            this.categories = this.af.database.list('/productcategories/' + category.$key + '/subcategories/', { query: { orderByChild: 'oid' } });
            this.parentcat = category.$key;
        }
        else if (category.catid === '8c' || category.catid === '9c') {
            this.categories = this.af.database.list('/productcategories/' + this.parentcat + '/subcategories/' + category.$key + '/types/', { query: { orderByChild: 'oid' } });
        }
        else {
            this.navCtrl.push(AddProductPage, { category: category });
        }
    };
    return SelectCategoryPage;
}());
SelectCategoryPage = __decorate([
    Component({
        selector: 'page-select-category',
        templateUrl: 'select-category.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire])
], SelectCategoryPage);
export { SelectCategoryPage };
//# sourceMappingURL=select-category.js.map