var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire } from 'angularfire2';
import firebase from 'firebase';
/*
  Generated class for the ProductData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var ProductData = (function () {
    function ProductData(http, af) {
        this.http = http;
        this.af = af;
        this.productList = firebase.database().ref('/products');
        this.currentUser = firebase.auth().currentUser;
        this.myProductList = firebase.database().ref('/users/' + this.currentUser.uid + '/products');
    }
    ProductData.prototype.getProduct = function (key) {
        return this.af.database.object('products/' + key);
    };
    /**getProduct(key: any): any {
        console.log(key);
        return this.productList.child(key);
    }**/
    /**
    * This one takes 2 string parameters, firstName & lastName, it just saves those 2 to the userProfile/uid node
    * for the current user as the firstName & lastName properties.
    */
    ProductData.prototype.updateName = function (key, Name) {
        this.myProductList.child(key).update({
            name: Name
        });
        return this.productList.child(key).update({
            name: Name,
        });
    };
    ProductData.prototype.updateGrade = function (key, Grade) {
        this.myProductList.child(key).update({
            gradeval: Grade
        });
        this.productList.child(key).update({
            gradeval: Grade
        });
    };
    ProductData.prototype.updateFinish = function (key, Finish) {
        return this.productList.child(key).update({
            finish: Finish,
        });
    };
    ProductData.prototype.updateThickness = function (key, Thickness) {
        return this.productList.child(key).update({
            thickness: Thickness,
        });
    };
    ProductData.prototype.updateWidth = function (key, Width) {
        return this.productList.child(key).update({
            width: Width,
        });
    };
    ProductData.prototype.updateLength = function (key, Length) {
        return this.productList.child(key).update({
            length: Length,
        });
    };
    ProductData.prototype.updateWeight = function (key, Weight) {
        return this.productList.child(key).update({
            weight: Weight,
        });
    };
    ProductData.prototype.updateNos = function (key, Nos) {
        return this.productList.child(key).update({
            nos: Nos,
        });
    };
    ProductData.prototype.updateMrate = function (key, Mrate) {
        this.myProductList.child(key).update({
            mrate: Mrate
        });
        return this.productList.child(key).update({
            mrate: Mrate,
        });
    };
    ProductData.prototype.updateKrate = function (key, Krate) {
        this.myProductList.child(key).update({
            krate: Krate
        });
        return this.productList.child(key).update({
            krate: Krate,
        });
    };
    ProductData.prototype.updateComposition = function (key, Composition) {
        return this.productList.child(key).update({
            composition: Composition,
        });
    };
    ProductData.prototype.updateOrigin = function (key, Origin) {
        return this.productList.child(key).update({
            origin: Origin,
        });
    };
    ProductData.prototype.updateBrand = function (key, Brand) {
        return this.productList.child(key).update({
            brand: Brand,
        });
    };
    ProductData.prototype.updateCategory = function (key, Category) {
        return this.productList.child(key).update({
            pcategory: Category,
        });
    };
    ProductData.prototype.updatePtype = function (key, Ptype) {
        return this.productList.child(key).update({
            ptype: Ptype,
        });
    };
    ProductData.prototype.updateSizes = function (key, Sizes) {
        return this.productList.child(key).update({
            sizes: Sizes,
        });
    };
    ProductData.prototype.updateType = function (key, Type) {
        return this.productList.child(key).update({
            type: Type,
        });
    };
    ProductData.prototype.updateSwg = function (key, Swg) {
        return this.productList.child(key).update({
            swg: Swg,
        });
    };
    ProductData.prototype.updateSch = function (key, Sch) {
        return this.productList.child(key).update({
            sch: Sch,
        });
    };
    ProductData.prototype.updateMm = function (key, MM) {
        return this.productList.child(key).update({
            mm: MM,
        });
    };
    ProductData.prototype.updateQuantity = function (key, quantity) {
        return this.productList.child(key).update({
            quantity: quantity,
        });
    };
    ProductData.prototype.updateUnit = function (key, unit) {
        return this.productList.child(key).update({
            unit: unit,
        });
    };
    ProductData.prototype.updateGuarantee = function (key, guarantee) {
        return this.productList.child(key).update({
            guarantee: guarantee,
        });
    };
    ProductData.prototype.updateQuality = function (key, quality) {
        return this.productList.child(key).update({
            quality: quality,
        });
    };
    ProductData.prototype.updateMtc = function (key, mtc) {
        return this.productList.child(key).update({
            mtc: mtc,
        });
    };
    ProductData.prototype.deleteProduct = function (key) {
        this.productList.child(key).remove();
        this.myProductList.child(key).remove();
    };
    return ProductData;
}());
ProductData = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, AngularFire])
], ProductData);
export { ProductData };
//# sourceMappingURL=product-data.js.map