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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SendQuotationPage } from '../send-quotation/send-quotation';
/*
  Generated class for the RequirementDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var RequirementDetailsPage = (function () {
    function RequirementDetailsPage(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.requirement = navParams.get("requirement");
    }
    RequirementDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RequirementDetailsPage');
        //console.log(this.requirement);
    };
    RequirementDetailsPage.prototype.sendQuote = function () {
        this.navCtrl.push(SendQuotationPage, { requirement: this.requirement });
        //console.log('Send Quote');
    };
    return RequirementDetailsPage;
}());
RequirementDetailsPage = __decorate([
    Component({
        selector: 'page-requirement-details',
        templateUrl: 'requirement-details.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AlertController])
], RequirementDetailsPage);
export { RequirementDetailsPage };
//# sourceMappingURL=requirement-details.js.map