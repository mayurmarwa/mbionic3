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
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
/*
  Generated class for the FilterOptions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var FilterOptionsPage = (function () {
    function FilterOptionsPage(navCtrl, navParams, viewCtrl, af) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.af = af;
        this.typeOD = true;
        this.category = {};
        this.category.catid = navParams.get("catid");
        this.form = {};
        this.getGrades();
    }
    FilterOptionsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FilterOptionsPage');
    };
    FilterOptionsPage.prototype.filterdismiss = function () {
        this.viewCtrl.dismiss(false); //Send back the form object when closeModal is called
    };
    FilterOptionsPage.prototype.applyFilter = function () {
        this.viewCtrl.dismiss(this.form); //Send back the form object when closeModal is called
    };
    FilterOptionsPage.prototype.consolelog = function () {
        //console.log(this.weight);
        //console.log(this.weightval);
    };
    FilterOptionsPage.prototype.getGrades = function () {
        if (this.category.catid == 1 || this.category.catid == 2 || this.category.catid == 3 || this.category.catid === '4a' || this.category.catid === '4b' || this.category.catid === '4c' || this.category.catid === '4d' || this.category.catid === '4e' || this.category.catid == 5 || this.category.catid == 6 || this.category.catid == 7) {
            this.gradecat = 1;
        }
        else if (this.category.catid === '8a' || this.category.catid === '8b' || this.category.catid === '8c1' || this.category.catid === '8c2' || this.category.catid === '8c3' || this.category.catid === '8c4' || this.category.catid === '8c5' || this.category.catid === '8d') {
            this.gradecat = 2;
        }
        else if (this.category.catid === '9a' || this.category.catid === '9b' || this.category.catid === '9c1' || this.category.catid === '9c2' || this.category.catid === '9c3' || this.category.catid === '9c4' || this.category.catid === '9c5' || this.category.catid === '9d') {
            this.form.selectedAlloy = 'Hastelloy';
            this.gradecat = 3;
        }
        else {
            this.gradecat = 1;
        }
        this.gradeList = this.af.database.list('/grades/' + this.gradecat);
    };
    FilterOptionsPage.prototype.typeSelected = function () {
        //console.log(this.typeOD);
        //console.log(this.seamlessForm.value.type);
        if (this.form.type === "OD") {
            this.typeOD = true;
        }
        else {
            this.typeOD = false;
        }
        //console.log(this.typeOD);
    };
    FilterOptionsPage.prototype.alloySelected = function () {
        if (this.form.selectedAlloy === 'Hastelloy') {
            this.gradecat = 3;
        }
        else if (this.form.selectedAlloy === 'Inconel') {
            this.gradecat = 4;
        }
        else if (this.form.selectedAlloy === 'Monel') {
            this.gradecat = 5;
        }
        else if (this.form.selectedAlloy === 'Nimonic') {
            this.gradecat = 6;
        }
        else if (this.form.selectedAlloy === 'Nickel') {
            this.gradecat = 7;
        }
        else if (this.form.selectedAlloy === 'Titanium') {
            this.gradecat = 8;
        }
        this.gradeList = this.af.database.list('/grades/' + this.gradecat);
    };
    return FilterOptionsPage;
}());
FilterOptionsPage = __decorate([
    Component({
        selector: 'page-filter-options',
        templateUrl: 'filter-options.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ViewController, AngularFire])
], FilterOptionsPage);
export { FilterOptionsPage };
//# sourceMappingURL=filter-options.js.map