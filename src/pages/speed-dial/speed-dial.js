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
import { CallNumber } from 'ionic-native';
import { Platform } from 'ionic-angular';
/*
  Generated class for the SpeedDial page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SpeedDialPage = (function () {
    function SpeedDialPage(navCtrl, navParams, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.callEnable = false;
        this.speedNumber = '';
        this.dialNumber = '';
    }
    SpeedDialPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SpeedDialPage');
    };
    SpeedDialPage.prototype.addNumber = function (number) {
        if (this.speedNumber.length < 4) {
            this.speedNumber = this.speedNumber + number;
            this.intNumber = parseInt(this.speedNumber, 10);
        }
        if (this.speedNumber.length == 4) {
            this.calNumber(this.intNumber);
        }
    };
    SpeedDialPage.prototype.calNumber = function (inum) {
        if (1000 <= inum && inum <= 1099) {
            this.dialNumber = "0226654" + inum;
        }
        else if (1100 <= inum && inum <= 1299) {
            this.dialNumber = "0226752" + inum;
        }
        else if (1300 <= inum && inum <= 1499) {
            this.dialNumber = "0226615" + inum;
        }
        else if (1500 <= inum && inum <= 1679) {
            this.dialNumber = "0226658" + inum;
        }
        else if (1680 <= inum && inum <= 1999) {
            this.dialNumber = "0226615" + inum;
        }
        else if (2000 <= inum && inum <= 3499) {
            this.dialNumber = "0226636" + inum;
        }
        else if (3500 <= inum && inum <= 4999) {
            this.dialNumber = "0226639" + inum;
        }
        else if (5000 <= inum && inum <= 5999) {
            this.dialNumber = "0226659" + inum;
        }
        else if (6000 <= inum && inum <= 6399) {
            this.dialNumber = "0226749" + inum;
        }
        else if (6400 <= inum && inum <= 6999) {
            this.dialNumber = "0226743" + inum;
        }
        else if (7000 <= inum && inum <= 7099) {
            this.dialNumber = "0226615" + inum;
        }
        else if (7100 <= inum && inum <= 7999) {
            this.dialNumber = "0226743" + inum;
        }
        else if (8000 <= inum && inum <= 8099) {
            this.dialNumber = "0226615" + inum;
        }
        else if (8100 <= inum && inum <= 8499) {
            this.dialNumber = "0226743" + inum;
        }
        else if (8500 <= inum && inum <= 8999) {
            this.dialNumber = "0226651" + inum;
        }
        else if (9000 <= inum && inum <= 9099) {
            this.dialNumber = "0226615" + inum;
        }
        else if (9100 <= inum && inum <= 9199) {
            this.dialNumber = "0226743" + inum;
        }
        else if (9200 <= inum && inum <= 9999) {
            this.dialNumber = "0226610" + inum;
        }
        this.callEnable = true;
        console.log(this.dialNumber);
    };
    SpeedDialPage.prototype.clearInput = function () {
        this.speedNumber = '';
        this.intNumber = '';
        this.callEnable = false;
    };
    SpeedDialPage.prototype.callIT = function () {
        if (!this.platform.is('cordova')) {
            window.open("tel:" + this.dialNumber);
            console.log("not cordova");
        }
        else {
            CallNumber.callNumber(this.dialNumber, true)
                .then(function () { return console.log('Launched dialer!'); })
                .catch(function () { return console.log('Error launching dialer'); });
        }
    };
    return SpeedDialPage;
}());
SpeedDialPage = __decorate([
    Component({
        selector: 'page-speed-dial',
        templateUrl: 'speed-dial.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Platform])
], SpeedDialPage);
export { SpeedDialPage };
//# sourceMappingURL=speed-dial.js.map