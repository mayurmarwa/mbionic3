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
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
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
    }
    PricesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PricesPage');
    };
    PricesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log("prices will enter");
        this.sub1 = this.af.database.list('/prices/lme', {
            query: {
                orderByChild: 'time'
            }
        })
            .subscribe(function (data) {
            _this.lmeList = [];
            data.forEach(function (obj) {
                //console.log(obj.$key);
                _this.lmeList.push(obj);
            });
            //this.requests.unsubscribe();
            _this.lmeList = Observable.of(_this.lmeList.reverse());
            //console.log(this.lmeList);
        });
        this.sub2 = this.af.database.list('/prices/mcx', {
            query: {
                orderByChild: 'time'
            }
        })
            .subscribe(function (data) {
            _this.mcxList = [];
            data.forEach(function (obj) {
                //console.log(obj);
                _this.mcxList.push(obj);
            });
            //this.requests.unsubscribe();
            _this.mcxList = Observable.of(_this.mcxList.reverse());
            //console.log(this.mcxList);
        });
    };
    PricesPage.prototype.ionViewWillLeave = function () {
        //this.lme
        //this.
        //console.log("price will unload");
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
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