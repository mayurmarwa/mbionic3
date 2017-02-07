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
import { LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
export var TabProfilePage = (function () {
    function TabProfilePage(authService, loadingCtrl) {
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.user = {};
        this.user.photoURL = 'assets/img/noimage.png';
    }
    TabProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.authService.currentUser
            .subscribe(function (user) {
            loading.dismiss();
            _this.user.displayName = user.displayName;
            _this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
            _this.user.photoURL = user.photoURL || _this.user.photoURL;
        }, function (error) {
            loading.dismiss();
            console.log('Error: ' + JSON.stringify(error));
        });
    };
    TabProfilePage = __decorate([
        Component({
            selector: 'page-tab-profile',
            templateUrl: 'tab-profile.html'
        }), 
        __metadata('design:paramtypes', [AuthService, LoadingController])
    ], TabProfilePage);
    return TabProfilePage;
}());
//# sourceMappingURL=tab-profile.js.map