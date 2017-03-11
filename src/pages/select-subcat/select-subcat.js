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
import { CategoryProductsPage } from '../category-products/category-products';
/*
  Generated class for the SelectSubcat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SelectSubcatPage = (function () {
    function SelectSubcatPage(navCtrl, navParams, af) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.catid = navParams.get("catid");
        this.loadCategory(this.catid);
    }
    SelectSubcatPage.prototype.loadCategory = function (catid) {
        if (catid === 4) {
            this.categories = this.af.database.list('/productcategories/SSPipes/subcategories/', { query: { orderByChild: 'oid' } });
            this.parentcat = 'SSPipes';
        }
        else if (catid === 8) {
            this.categories = this.af.database.list('/productcategories/D&SD/subcategories/', { query: { orderByChild: 'oid' } });
            this.parentcat = 'D&SD';
        }
        else if (catid === 9) {
            this.categories = this.af.database.list('/productcategories/Nickel/subcategories/', { query: { orderByChild: 'oid' } });
            this.parentcat = 'Nickel';
        }
        else if (catid === '8c' || catid === '9c') {
            this.categories = this.af.database.list('/productcategories/' + this.parentcat + '/subcategories/pipes/types/', { query: { orderByChild: 'oid' } });
        }
        else {
            this.navCtrl.push(CategoryProductsPage, { catid: catid });
        }
    };
    SelectSubcatPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SelectSubcatPage');
    };
    return SelectSubcatPage;
}());
SelectSubcatPage = __decorate([
    Component({
        selector: 'page-select-subcat',
        templateUrl: 'select-subcat.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire])
], SelectSubcatPage);
export { SelectSubcatPage };
//# sourceMappingURL=select-subcat.js.map