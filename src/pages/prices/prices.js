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
/*
  Generated class for the Prices page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var PricesPage = (function () {
    function PricesPage(navCtrl, navParams, af) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.segment = "mcx";
        this.lmeList = this.af.database.list('/prices/lme');
        this.mcxList = this.af.database.list('/prices/mcx');
    }
    PricesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PricesPage');
    };
    PricesPage.prototype.updatePriceList = function () {
        console.log(this.segment);
    };
    return PricesPage;
}());
PricesPage = __decorate([
    Component({
        selector: 'page-prices',
        templateUrl: 'prices.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire])
], PricesPage);
export { PricesPage };
//# sourceMappingURL=prices.js.map