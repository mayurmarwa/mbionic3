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
/*
  Generated class for the MemberDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MemberDetailsPage = (function () {
    function MemberDetailsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        console.log(navParams.get('member'));
        this.member = navParams.get('member');
    }
    MemberDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MemberDetailsPage');
    };
    return MemberDetailsPage;
}());
MemberDetailsPage = __decorate([
    Component({
        selector: 'page-member-details',
        templateUrl: 'member-details.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], MemberDetailsPage);
export { MemberDetailsPage };
//# sourceMappingURL=member-details.js.map