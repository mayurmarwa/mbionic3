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
import { ModalController } from 'ionic-angular';
import { MemberDetailsPage } from '../member-details/member-details';
import { PopoverController } from 'ionic-angular';
/*
  Generated class for the Directory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var DirectoryPage = (function () {
    function DirectoryPage(navCtrl, navParams, af, modalCtrl, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.directoryList = af.database.list('/directory', { query: { orderByChild: 'name' } });
    }
    DirectoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DirectoryPage');
    };
    DirectoryPage.prototype.viewDetails = function (member) {
        //let profileModal = this.modalCtrl.create(MemberDetailsPage, { member: member });
        //profileModal.present();
        var popover = this.popoverCtrl.create(MemberDetailsPage, { member: member }, { cssClass: 'contact-popover' });
        popover.present();
    };
    return DirectoryPage;
}());
DirectoryPage = __decorate([
    Component({
        selector: 'page-directory',
        templateUrl: 'directory.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire, ModalController, PopoverController])
], DirectoryPage);
export { DirectoryPage };
//# sourceMappingURL=directory.js.map