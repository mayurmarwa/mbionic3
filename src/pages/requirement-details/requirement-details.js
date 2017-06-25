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
import { NavController, NavParams, AlertController, ViewController, ToastController } from 'ionic-angular';
import { SendQuotationPage } from '../send-quotation/send-quotation';
import { Storage } from '@ionic/storage';
import { ProductData } from '../../providers/product-data';
/*
  Generated class for the RequirementDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var RequirementDetailsPage = (function () {
    function RequirementDetailsPage(navCtrl, navParams, toastCtrl, productData, alertCtrl, storage, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.productData = productData;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        storage.ready().then(function () {
            storage.get('currentuser').then(function (val) {
                _this.currentuser = JSON.parse(val);
                _this.requirement = navParams.get("requirement");
                //console.log(this.product);
                //console.log(this.currentuser);
            })
                .catch(function (err) {
                return console.log(err);
            });
        }).catch(function (err) {
            return console.log(err);
        });
    }
    RequirementDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RequirementDetailsPage');
        // console.log(this.viewCtrl.index);
        //console.log(this.requirement);
    };
    RequirementDetailsPage.prototype.sendQuote = function () {
        this.navCtrl.push(SendQuotationPage, { requirement: this.requirement });
        //console.log('Send Quote');
    };
    RequirementDetailsPage.prototype.confirmDelete = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Delete Requirement?',
            message: 'Do you want to delete this requirement?',
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Confirm',
                    handler: function (data) {
                        _this.productData.deleteRequirement(_this.requirement.key);
                        var toast = _this.toastCtrl.create({
                            message: 'Requirement Deleted',
                            duration: 2000,
                            position: 'middle'
                        });
                        toast.present().then(function () { _this.navCtrl.popToRoot; });
                    }
                }
            ]
        });
        alert.present();
    };
    return RequirementDetailsPage;
}());
RequirementDetailsPage = __decorate([
    Component({
        selector: 'page-requirement-details',
        templateUrl: 'requirement-details.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ToastController, ProductData, AlertController, Storage, ViewController])
], RequirementDetailsPage);
export { RequirementDetailsPage };
//# sourceMappingURL=requirement-details.js.map