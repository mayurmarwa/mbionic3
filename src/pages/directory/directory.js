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
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { MemberDetailsPage } from '../member-details/member-details';
import { PopoverController } from 'ionic-angular';
import { DirectoryProvider } from '../../providers/directory-provider';
/*
  Generated class for the Directory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var DirectoryPage = (function () {
    function DirectoryPage(navCtrl, directoryData, navParams, alertCtrl, modalCtrl, popoverCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.directoryData = directoryData;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.loadingCtrl = loadingCtrl;
        this.directory = [];
        this.directory = this.directoryData.directory;
        this.loadedlist = this.directoryData.directory;
        this.loadingPopup = this.loadingCtrl.create({
            content: 'Updating...'
        });
        //this.loadingPopup.present();
        //this.directoryRef = firebase.database().ref('/directory');
        // this.directoryRef.on('value', countryList => {
        // let countries = [];
        // countryList.forEach(country => {
        //    countries.push(country.val());
        //});
        //this.directory = countries;
        //this.loadedlist = countries;
        //console.log("here", this.directory);
        //this.loadingPopup.dismiss();
        //});
        //this.getmembers();
    }
    DirectoryPage.prototype.getmembers = function () {
    };
    DirectoryPage.prototype.initializeItems = function () {
        this.directory = this.loadedlist;
    };
    DirectoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DirectoryPage');
    };
    DirectoryPage.prototype.openAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'MetBazaar Directory',
            subTitle: 'To update contact info, company details, excise info or to add your company, send us details at contact@metbazaar.com',
        });
        alert.present();
    };
    DirectoryPage.prototype.getItems = function (searchbar) {
        // Reset items back to all of the items
        this.initializeItems();
        // set q to the value of the searchbar
        var q = searchbar.srcElement.value;
        // if the value is an empty string don't filter the items
        if (!q) {
            return;
        }
        this.directory = this.directory.filter(function (v) {
            if (v.Name && q) {
                if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
        console.log(q, this.directory.length);
    };
    DirectoryPage.prototype.viewDetails = function (member) {
        //let profileModal = this.modalCtrl.create(MemberDetailsPage, { member: member });
        //profileModal.present();
        this.navCtrl.push(MemberDetailsPage, { member: member });
        //let popover = this.popoverCtrl.create(MemberDetailsPage, { member: member }, { cssClass: 'contact-popover' });
        //popover.present();
    };
    return DirectoryPage;
}());
DirectoryPage = __decorate([
    Component({
        selector: 'page-directory',
        templateUrl: 'directory.html'
    }),
    __metadata("design:paramtypes", [NavController, DirectoryProvider, NavParams, AlertController, ModalController, PopoverController, LoadingController])
], DirectoryPage);
export { DirectoryPage };
//# sourceMappingURL=directory.js.map